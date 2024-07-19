import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import FormBank from "../components/forms/FormBank.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import AddButton from "../components/AddButton.jsx";
import CreateTXT from "../components/forms/CreateTXT.jsx";

const banks = [
  {
    id: 1,
    bank: "Mercantil",
    number_account: "601400000055554444",
    type: "Corriente",
    identification: "V-28989090",
    owner: "johndoe",
    code: "0152",
  },
  {
    id: 2,
    bank: "BNC",
    number_account: "601400000066664444",
    type: "Ahorro",
    identification: "V-27989090",
    owner: "janesmith",
    code: "0152",
  },
  {
    id: 3,
    bank: "Venezuela",
    number_account: "601400000077774444",
    type: "Corriente",
    identification: "V-26989090",
    owner: "samjohnson",
    code: "0152",
  },
  {
    id: 1,
    bank: "Mercantil",
    number_account: "601400000055554444",
    type: "Corriente",
    identification: "V-28989090",
    owner: "johndoe",
    code: "0152",
  },
  {
    id: 2,
    bank: "BNC",
    number_account: "601400000066664444",
    type: "Ahorro",
    identification: "V-27989090",
    owner: "janesmith",
    code: "0152",
  },
  {
    id: 3,
    bank: "Venezuela",
    number_account: "601400000077774444",
    type: "Corriente",
    identification: "V-26989090",
    owner: "samjohnson",
    code: "0152",
  },
  {
    id: 1,
    bank: "Mercantil",
    number_account: "601400000055554444",
    type: "Corriente",
    identification: "V-28989090",
    owner: "johndoe",
    code: "0152",
  },
  {
    id: 2,
    bank: "BNC",
    number_account: "601400000066664444",
    type: "Ahorro",
    identification: "V-27989090",
    owner: "janesmith",
    code: "0152",
  },
  {
    id: 3,
    bank: "Venezuela",
    number_account: "601400000077774444",
    type: "Corriente",
    identification: "V-26989090",
    owner: "samjohnson",
    code: "0152",
  },
  {
    id: 1,
    bank: "Mercantil",
    number_account: "601400000055554444",
    type: "Corriente",
    identification: "V-28989090",
    owner: "johndoe",
    code: "0152",
  },
  {
    id: 2,
    bank: "BNC",
    number_account: "601400000066664444",
    type: "Ahorro",
    identification: "V-27989090",
    owner: "janesmith",
    code: "0152",
  },
  {
    id: 3,
    bank: "Venezuela",
    number_account: "601400000077774444",
    type: "Corriente",
    identification: "V-26989090",
    owner: "samjohnson",
    code: "0152",
  },
  {
    id: 1,
    bank: "Mercantil",
    number_account: "601400000055554444",
    type: "Corriente",
    identification: "V-28989090",
    owner: "johndoe",
    code: "0152",
  },
  {
    id: 2,
    bank: "BNC",
    number_account: "601400000066664444",
    type: "Ahorro",
    identification: "V-27989090",
    owner: "janesmith",
    code: "0152",
  },
  {
    id: 3,
    bank: "Venezuela",
    number_account: "601400000077774444",
    type: "Corriente",
    identification: "V-26989090",
    owner: "samjohnson",
    code: "0152",
  },
  {
    id: 1,
    bank: "Mercantil",
    number_account: "601400000055554444",
    type: "Corriente",
    identification: "V-28989090",
    owner: "johndoe",
    code: "0152",
  },
  {
    id: 2,
    bank: "BNC",
    number_account: "601400000066664444",
    type: "Ahorro",
    identification: "V-27989090",
    owner: "janesmith",
    code: "0152",
  },
  {
    id: 3,
    bank: "Venezuela",
    number_account: "601400000077774444",
    type: "Corriente",
    identification: "V-26989090",
    owner: "samjohnson",
    code: "0152",
  },
  {
    id: 1,
    bank: "Mercantil",
    number_account: "601400000055554444",
    type: "Corriente",
    identification: "V-28989090",
    owner: "johndoe",
    code: "0152",
  },
  {
    id: 2,
    bank: "BNC",
    number_account: "601400000066664444",
    type: "Ahorro",
    identification: "V-27989090",
    owner: "janesmith",
    code: "0152",
  },
  {
    id: 3,
    bank: "Venezuela",
    number_account: "601400000077774444",
    type: "Corriente",
    identification: "V-26989090",
    owner: "samjohnson",
    code: "0152",
  },
  
];

const columns = [
  { label: "Banco", accessor: "bank" },
  { label: "N. Cuenta", accessor: "number_account" },
  { label: "Tipo Cuenta", accessor: "type" },
  { label: "Identificacion", accessor: "identification" },
  { label: "Titular", accessor: "owner" },
];

const ITEMS_PER_PAGE = 10; // Número de elementos por página

export default function Banks() {
  const [filteredBanks, setFilteredBanks] = useState(banks);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBank, setCurrentBank] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredBanks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBanks.length / ITEMS_PER_PAGE);

  const handleSearch = (query) => {
    const filtered = banks.filter(bank =>
      bank.banco.toLowerCase().includes(query.toLowerCase())
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

  const handleDelete = () => {
    // Lógica de eliminación
    closeModals();
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-white font-bold mb-4 text-left">Bancos</h1>
        <div className="grid grid-cols-2">
        <SearchBar placeholder="Buscar bancos..." onSearch={handleSearch}/>
        <button className="mb-4 p-2 text-white font-bold rounded-full bg-principalAzulTono5 w-1/4 hover:bg-principalAzulTono3" onClick={e => setIsModalOpen2(true)}>Crear TXT</button>
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
          title={currentBank ? "Editar Banco" : "Registrar nuevo banco"}
        >
          <FormBank bank={currentBank} submit={currentBank ? "Editar" : "Agregar "} />
        </Modal>
        <Modal
          isOpen={isModalOpen2}
          onClose={closeModals}
          title={"Crear TXT"}
        >
          <CreateTXT/>
        </Modal>
        <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onDelete={handleDelete}
        article="el"
        entityName="banco" />
      </div>
    </>
  );
}
