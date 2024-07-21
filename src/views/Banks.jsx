import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import FormBank from "../components/forms/FormBank.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import AddButton from "../components/AddButton.jsx";
import CreateTXT from "../components/forms/CreateTXT.jsx";
import { Contexto } from "../context/Contexto.jsx";
import { alertConfirm, alertError } from "../components/alerts/alerts.js";

const columns = [
  { label: "Banco", accessor: "bank_id" },
  { label: "N. Cuenta", accessor: "account_number" },
  { label: "Tipo Cuenta", accessor: "account_type" },
  { label: "Titular", accessor: "employee_id" },
];

const ITEMS_PER_PAGE = 10; // Número de elementos por página

export default function Banks() {
  const {
    banksAcountsData,
    setBanksAcountsData,
    setEmployeesData,
    setBanksData,
    peticionGet,
    peticionDelete,
  } = useContext(Contexto);

  const [filteredBanks, setFilteredBanks] = useState(banksAcountsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBank, setCurrentBank] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/banks_accounts/all",
        "GET"
      );
      setBanksAcountsData(respuesta);
      setFilteredBanks(respuesta);
      const respusta2 = await peticionGet(
        "http://localhost:3000/api/banks/all",
        "GET"
      );
      setBanksData(respusta2);
      const respusta3 = await peticionGet(
        "http://localhost:3000/api/employees/all",
        "GET"
      );
      setEmployeesData(respusta3);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    setFilteredBanks(banksAcountsData);
  }, [banksAcountsData]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredBanks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBanks.length / ITEMS_PER_PAGE);

  const handleSearch = (query) => {
    const filtered = banksAcountsData.filter((bank) =>
      bank.bank_id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBanks(filtered);
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openAddModal = () => {
    setCurrentBank(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentBank(user);
    setIsModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (user) => {
    setCurrentBank(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setFilteredBanks(filteredBanks.filter((item) => item._id !== currentBank._id));
    // Lógica de eliminación
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/banks_accounts/${currentBank._id}`,
      "DELETE"
    );
    console.log(respuesta);
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError("Ocurrio un Error Revisa la Consola");
    }
    closeModals();
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-white font-bold mb-4 text-left">Bancos</h1>
        <div className="grid grid-cols-2">
          <SearchBar placeholder="Buscar bancos..." onSearch={handleSearch} />
          <button
            className="mb-4 p-2 text-white font-bold rounded-full bg-principalAzulTono5 w-1/4 hover:bg-principalAzulTono3"
            onClick={(e) => setIsModalOpen2(true)}
          >
            Crear TXT
          </button>
        </div>
        {filteredBanks.length === 0 ? (
          <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
            No hay bancos de usuarios registrados...
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
          title={currentBank ? "Editar Banco" : "Registrar nuevo banco"}
        >
          <FormBank
            bank={currentBank}
            submit={currentBank ? "Editar" : "Agregar "}
            onClose={closeModals}
          />
        </Modal>
        <Modal isOpen={isModalOpen2} onClose={closeModals} title={"Crear TXT"}>
          <CreateTXT />
        </Modal>
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeModals}
          onDelete={handleDelete}
          article="el"
          entityName="banco"
        />
      </div>
    </>
  );
}
