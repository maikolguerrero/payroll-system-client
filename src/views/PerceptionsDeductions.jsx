import { useState } from "react"
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import FormDeductions from "../components/forms/primes/FormDeductions";

const perceptions = [
  {
    name: "Bono Responsabilidad",
    description: "Asistir puntualmente todos los dias laborares",
    type: "Bono",
    date: "2024-07-10",
    amount: 50
  },
  {
    name: "Bono Trabajador",
    description: "Ser eficiente en el trabajo",
    type: "Bono",
    date: "2024-07-15",
    amount: 100
  }
]

const deductions = [
  {
    name: "Cargo por cuota lapto",
    description: "Se mantiene pagando un equipo de la compañia",
    type: "Pago a Cuotas",
    date: "2024-07-10",
    amount: 150
  },
  {
    name: "Cargo por cuota lapto",
    description: "Se mantiene pagando un equipo de la compañia",
    type: "Pago a Cuotas",
    date: "2024-07-10",
    amount: 150
  }
]

const columns = [
  { label: "Nombre", accessor: "name" },
  { label: "Descripción", accessor: "description" },
  { label: "Tipo", accessor: "type" },
  { label: "Fecha", accessor: "date" },
  { label: "Monto", accessor: "amount" },
];

const ITEMS_PER_PAGE = 10; // Número de elementos por página

export default function PerceptionsDeductions() {
  const [filtered, setFiltered] = useState(perceptions);
  const [title, setTitle] = useState("Percepciones");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleSearch = (query) => {
    let filtered = []
    if (title === "Percepciones") {
      filtered = perceptions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filtered = deductions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFiltered(filtered);
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const handleChangeType = (value) => {
    setTitle(value)
    if (value === "Percepciones") {
      setFiltered(perceptions)
    } else {
      setFiltered(deductions)
    }
  }

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

  const handleDelete = () => {
    // Lógica de eliminación
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
        <h1 className="text-2xl text-white font-bold mb-4 text-left">{title}</h1>
        <div className="flex gap-8 mb-8">
          <SearchBar placeholder="Buscar bancos..." onSearch={handleSearch} />
          <select name="type-cost" id="type-cost" onChange={e => handleChangeType(e.currentTarget.value)} className="w-1/3 shadow appearance-none border-transparent rounded-[10px] py-2 px-3 text-gray-800 leading-tight bg-white">
            <option value="Percepciones">Percepciones</option>
            <option value="Deducciones">Deducciones</option>
          </select>
        </div>
        <Table columns={columns} data={currentItems} onEdit={openEditModal} onDelete={openDeleteModal} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <AddButton openModal={openAddModal} />

        <Modal
          isOpen={isModalOpen}
          onClose={closeModals}
          title={current ? "Editar "+title : "Registrar nuevas "+title}
        >
          <FormDeductions submit={current ? "Editar" : "Agregar "} current={current} table={title} />
        </Modal>

        <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onDelete={handleDelete}
        article="la"
        entityName={title} />
      </div>
    </>
  );
}
