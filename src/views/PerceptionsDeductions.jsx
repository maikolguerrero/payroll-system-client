import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import FormDeductions from "../components/forms/primes/FormDeductions";
import { Contexto } from "../context/Contexto";
import { alertConfirm, alertError } from "../components/alerts/alerts";

const columns = [
  { label: "Tipo", accessor: "type" },
  { label: "Descripción", accessor: "description" },
  { label: "Fecha", accessor: "date" },
  { label: "Monto", accessor: "amount" },
];

const ITEMS_PER_PAGE = 10; // Número de elementos por página

export default function PerceptionsDeductions() {
  const {
    deductionsData,
    setDeductionsData,
    perceptionsData,
    setPerceptionsData,
    peticionGet,
    peticionDelete,
  } = useContext(Contexto);

  const [filtered, setFiltered] = useState(perceptionsData);
  const [title, setTitle] = useState("Percepciones");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/perceptions/all",
        "GET"
      );
      const respuesta2 = await peticionGet(
        "http://localhost:3000/api/deductions/all",
        "GET"
      );
      setPerceptionsData(respuesta);
      setDeductionsData(respuesta2);
      setFiltered(respuesta);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    setFiltered(perceptionsData);
  }, [perceptionsData]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleSearch = (query) => {
    let filtered = [];
    if (title === "Percepciones") {
      filtered = perceptionsData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filtered = deductionsData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFiltered(filtered);
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const handleChangeType = (value) => {
    setTitle(value);
    if (value === "Percepciones") {
      setFiltered(perceptionsData);
    } else {
      setFiltered(deductionsData);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openAddModal = () => {
    setCurrent(null);
    setIsModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    setFiltered(filtered.filter((item) => item._id !== current._id));
    // Lógica de eliminación
    let respuesta = "";
    if (title === "Percepciones") {
      respuesta = await peticionDelete(
        `http://localhost:3000/api/perceptions/${current._id}`,
        "DELETE"
      );
    } else {
      respuesta = await peticionDelete(
        `http://localhost:3000/api/deductions/${current._id}`,
        "DELETE"
      );
    }
    console.log(respuesta);
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError("Ocurrio un Error Revisa la Consola");
    }
    closeModals();
  };

  const openDeleteModal = (user) => {
    setCurrent(user);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrent(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl text-white font-bold mb-4 text-left">
          {title}
        </h1>
        <div className="flex gap-8 mb-8">
          <SearchBar placeholder="Buscar bancos..." onSearch={handleSearch} />
          <select
            name="type-cost"
            id="type-cost"
            onChange={(e) => handleChangeType(e.currentTarget.value)}
            className="w-1/3 shadow appearance-none border-transparent rounded-[10px] py-2 px-3 text-gray-800 dark:text-white dark:bg-gray-700 leading-tight bg-white"
          >
            <option value="Percepciones">Percepciones</option>
            <option value="Deducciones">Deducciones</option>
          </select>
        </div>
        {filtered.length === 0 ? (
          <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
            No hay {title} registrados...
          </h3>
        ) : (
          <>
            <Table
              columns={columns}
              data={currentItems}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
        <AddButton openModal={openAddModal} />

        <Modal
          isOpen={isModalOpen}
          onClose={closeModals}
          title={current ? "Editar " + title : "Registrar nuevas " + title}
        >
          <FormDeductions
            submit={current ? "Editar" : "Agregar "}
            current={current}
            table={title}
            onClose={closeModals}
          />
        </Modal>

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeModals}
          onDelete={handleDelete}
          article="la"
          entityName={title}
        />
      </div>
    </>
  );
}
