import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import AddButton from "../../components/AddButton";
import Modal from "../../components/Modal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import FormUser from "../../components/forms/FormUser";
import { Contexto } from "../../context/Contexto";
import { alertConfirm, alertError } from "../../components/alerts/alerts";

const columns = [
  { label: "Username", accessor: "username" },
  { label: "Nombre", accessor: "name" },
  { label: "Rol", accessor: "role" },
];

const ITEMS_PER_PAGE = 10; // Número de elementos por página

export default function Users() {
  const { peticionGet, users, setUsers, peticionDelete } = useContext(Contexto);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]); // Datos originales
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/users/all",
        "GET"
      );
      setUsers(respuesta);
      setOriginalUsers(respuesta); // Guardar los datos originales
      setFilteredUsers(respuesta);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
    setOriginalUsers(users);
  }, [users]);

  const handleSearch = (query) => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const handleReset = () => {
    setFilteredUsers(users);
    setCurrentPage(1); // Resetea la página actual al reiniciar
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredUsers?.length == 0 ? [] : filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = filteredUsers?.length == 0 ? [] : Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

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

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };


  const handleDelete = async () => {
    setUsers(
      users.filter((user) => user._id !== currentUser._id)
    );
    setFilteredUsers(
      filteredUsers.filter((user) => user._id !== currentUser._id)
    );
    setOriginalUsers(
      originalUsers.filter((user) => user._id !== currentUser._id)
    );
    // Lógica de eliminación
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/users/${currentUser._id}`,
      "DELETE"
    );
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError(respuesta.error);
    }
    closeDeleteModal();
  };

  const updateUsers = async () => {
    const respuesta = await peticionGet(
      "http://localhost:3000/api/users/all",
      "GET"
    );
    setOriginalUsers(respuesta);
    setFilteredUsers(respuesta);
    setUsers(respuesta);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">Usuarios</h1>
      <div className="mb-4 flex gap-4">
        <SearchBar placeholder="Buscar usuarios..." onSearch={handleSearch} onReset={handleReset} />
      </div>
      {filteredUsers.length === 0 ? (
        <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
          No hay usuarios registrados...
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
        title={currentUser ? "Editar usuario" : "Registrar nuevo usuario"}
      >
        <FormUser
          user={currentUser}
          submit={currentUser ? "Actualizar" : "Registrar"}
          onClose={closeModals}
          onSubmit={updateUsers}
        />
      </Modal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onDelete={handleDelete}
        article="el"
        entityName="usuario"
      />
    </div>
  );
}