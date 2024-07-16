import React, { useState } from 'react';
import Modal from '../components/Modal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import AddButton from '../components/AddButton';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import FormDepartments from '../components/forms/FormDepartments';

const departmentsData = [
  { id: 1, name: "IT", description: "Departamento de Tecnología de la Información", location: "Edificio A" },
  { id: 2, name: "HR", description: "Departamento de Recursos Humanos", location: "Edificio B" },
];

const columns = [
  { label: "Nombre", accessor: "name" },
  { label: "Descripción", accessor: "description" },
  { label: "Ubicación", accessor: "location" },
];

const ITEMS_PER_PAGE = 10;

const Departments = () => {
  const [departments, setDepartments] = useState(departmentsData);
  const [filteredDepartments, setFilteredDepartments] = useState(departmentsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);

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

  const handleDelete = () => {
    setDepartments(departments.filter(dept => dept.id !== currentDepartment.id));
    setFilteredDepartments(filteredDepartments.filter(dept => dept.id !== currentDepartment.id));
    closeDeleteModal();
  };

  const handleSearch = (query) => {
    const filtered = departments.filter(department =>
      department.name.toLowerCase().includes(query.toLowerCase()) ||
      department.description.toLowerCase().includes(query.toLowerCase()) ||
      department.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDepartments(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDepartments.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddEditDepartment = (departmentData) => {
    if (currentDepartment) {
      setDepartments(departments.map(dept => dept.id === currentDepartment.id ? departmentData : dept));
      setFilteredDepartments(filteredDepartments.map(dept => dept.id === currentDepartment.id ? departmentData : dept));
    } else {
      const newDepartment = { ...departmentData, id: departments.length + 1 };
      setDepartments([...departments, newDepartment]);
      setFilteredDepartments([...filteredDepartments, newDepartment]);
    }
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">Departamentos</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
      <SearchBar placeholder="Buscar departamentos..." onSearch={handleSearch} />
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
        onClose={closeModal}
        title={currentDepartment ? "Editar departamento" : "Agregar Departamento"}
      >
        <FormDepartments department={currentDepartment} onSubmit={handleAddEditDepartment} />
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
