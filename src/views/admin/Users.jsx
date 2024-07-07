import React, { useState } from 'react';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import AddButton from '../../components/AddButton';
import Modal from '../../components/Modal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import FormUser from '../../components/forms/FormUser';

const users = [
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" },
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" },
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" },
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" },
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" },
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" },
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" },
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" }
];

const columns = [
  { label: "Username", accessor: "username" },
  { label: "Nombre", accessor: "name" },
  { label: "Contraseña", accessor: "password" },
];

const ITEMS_PER_PAGE = 10; // Número de elementos por página

export default function Users() {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearch = (query) => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openAddModal = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    // Lógica de eliminación
    closeModals();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">Usuarios</h1>
      <SearchBar placeholder="Buscar usuarios..." onSearch={handleSearch} />
      <Table columns={columns} data={currentItems} onEdit={openEditModal} onDelete={openDeleteModal} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddButton openModal={openAddModal} />
      <Modal isOpen={isModalOpen} onClose={closeModals} title={currentUser ? "Editar usuario" : "Registrar nuevo usuario"}>
        <FormUser user={currentUser} />
      </Modal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onDelete={handleDelete}
        article="el"
        entityName="usuario" />
    </div>
  );
}