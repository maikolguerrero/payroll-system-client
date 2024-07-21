import { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import FormBank from "../../components/forms/FormBank.jsx";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal.jsx";
import AddButton from "../../components/AddButton.jsx";
import CreateTXT from "../../components/forms/CreateTXT.jsx";
import FormBankSystem from "../../components/forms/FormBankSystem.jsx";
import { Contexto } from "../../context/Contexto.jsx";
import { alertConfirm, alertError } from "../../components/alerts/alerts.js";

const columns = [
  { label: "Banco", accessor: "name" },
  { label: "Código", accessor: "code" },
];

const ITEMS_PER_PAGE = 10; // Número de elementos por página

export default function BanksSystem() {
  const { banksData, setBanksData, peticionGet, peticionDelete } =
    useContext(Contexto);

  const [filteredBanks, setFilteredBanks] = useState(banksData);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBank, setCurrentBank] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredBanks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBanks.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/banks/all",
        "GET"
      );
      setBanksData(respuesta);
      setFilteredBanks(respuesta);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    setFilteredBanks(banksData);
  }, [banksData]);

  const handleSearch = (query) => {
    const filtered = banksData.filter((bank) =>
      bank.name.toLowerCase().includes(query.toLowerCase())
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
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (user) => {
    setCurrentBank(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setFilteredBanks(
      filteredBanks.filter((bank) => bank._id !== currentBank._id)
    );
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/banks/${currentBank._id}`,
      "DELETE"
    );
    console.log(respuesta);
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError("Ocurrio un Error Revisa la Consola");
    }
    // Lógica de eliminación
    closeModals();
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-white font-bold mb-4 text-left">
          Bancos del Sistema
        </h1>
        <div className="grid grid-cols-2 mb-8">
          <SearchBar placeholder="Buscar bancos..." onSearch={handleSearch} />
        </div>
        {filteredBanks.length === 0 ? (
          <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
            No hay bancos en el sistema registrados...
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
          <FormBankSystem
            bank={currentBank}
            submit={currentBank ? "Editar" : "Agregar "}
            onClose={closeModals}
          />
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