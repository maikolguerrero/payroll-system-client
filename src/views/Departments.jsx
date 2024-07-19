import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import FormDepartments from "../components/forms/FormDepartments";
import { Contexto } from "../context/Contexto";
import { alertConfirm, alertError } from "../components/alerts/alerts";

const columns = [
  { label: "Nombre", accessor: "name" },
  { label: "Descripción", accessor: "description" },
  { label: "Ubicación", accessor: "location" },
];

const ITEMS_PER_PAGE = 10;

const Departments = () => {
  const { departmentsData, setDepartmentsData, peticionGet, peticionDelete } =
    useContext(Contexto);

  const [departments, setDepartments] = useState(departmentsData);
  const [filteredDepartments, setFilteredDepartments] =
    useState(departmentsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);

  useEffect(() => {
    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/departments/all",
        "GET"
      );
      setDepartmentsData(respuesta);
      setDepartments(respuesta);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    setFilteredDepartments(departmentsData);
  }, [departmentsData]);

  const openAddModal = () => {
    setCurrentDepartment(null);
    setIsModalOpen(true);
  };

  const openEditModal = (department) => {
    setCurrentDepartment(department);
    setIsModalOpen(true);
  };

  const openDeleteModal = (department) => {
    setCurrentDepartment(department);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    setDepartments(
      departments.filter((dept) => dept._id !== currentDepartment._id)
    );
    setFilteredDepartments(
      filteredDepartments.filter((dept) => dept._id !== currentDepartment._id)
    );
    // Lógica de eliminación
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/departments/${currentDepartment._id}`,
      "DELETE"
    );
    console.log(respuesta);
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError("Ocurrio un Error Revisa la Consola");
    }
    closeDeleteModal();
  };

  const handleSearch = (query) => {
    const filtered = departments.filter(
      (department) =>
        department.name.toLowerCase().includes(query.toLowerCase()) ||
        department.description.toLowerCase().includes(query.toLowerCase()) ||
        department.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDepartments(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDepartments.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /*const handleAddEditDepartment = (departmentInfo) => {
    if (currentDepartment) {
      setDepartments(
        departments.map((dept) =>
          dept._id === currentDepartment._id ? departmentInfo : dept
        )
      );
      setFilteredDepartments(
        filteredDepartments.map((dept) =>
          dept._id === currentDepartment._id ? departmentInfo : dept
        )
      );
    } else {
      const newDepartment = { ...departmentInfo, _id: departmentInfo._id };
      setDepartments([...departments, newDepartment]);
      setFilteredDepartments([...filteredDepartments, newDepartment]);
    }
    closeModal();
  };*/

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">
        Departamentos
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
        <SearchBar
          placeholder="Buscar departamentos..."
          onSearch={handleSearch}
        />
      </div>
      {departments.length === 0 ? (
        <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
          No hay departamentos registrados...
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
        onClose={closeModal}
        title={
          currentDepartment ? "Editar departamento" : "Agregar Departamento"
        }
      >
        <FormDepartments department={currentDepartment} onClose={closeModal} />
      </Modal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        article="el"
        entityName="departamento"
      />
    </div>
  );
};

export default Departments;
