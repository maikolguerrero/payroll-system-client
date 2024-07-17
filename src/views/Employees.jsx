import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import AddButton from '../components/AddButton';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import FormEmployees from '../components/forms/FormEmployees';

const employeesData = [
  { id: 1, ci: "12345678", name: "John Doe", department: "IT", position: "Developer", salary: "$5000", startDate: "2020-01-15", phone: "123456789", email: "john.doe@example.com", address: "123 Main St", birthDate: "1990-05-12" },
  { id: 2, ci: "09876543", name: "Jane Smith", department: "HR", position: "Manager", salary: "$6000", startDate: "2019-02-20", phone: "987654321", email: "jane.smith@example.com", address: "456 Elm St", birthDate: "1985-07-23" },
];

const columns = [
  { label: "CI", accessor: "ci" },
  { label: "Nombre", accessor: "name" },
  { label: "Departamento", accessor: "department" },
  { label: "Cargo", accessor: "position" },
  { label: "Salario", accessor: "salary" },
  { label: "Fecha Ingreso", accessor: "startDate" },
  { label: "Teléfono", accessor: "phone" },
  { label: "Correo", accessor: "email" },
  { label: "Dirección", accessor: "address" },
  { label: "Fecha de Nacimiento", accessor: "birthDate" },
];

const ITEMS_PER_PAGE = 10;

const Employees = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [filteredEmployees, setFilteredEmployees] = useState(employeesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const openAddModal = () => {
    setCurrentEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const openDeleteModal = (employee) => {
    setCurrentEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== currentEmployee.id));
    setFilteredEmployees(filteredEmployees.filter(emp => emp.id !== currentEmployee.id));
    closeDeleteModal();
  };

  const handleSearch = (query) => {
    const filtered = employees.filter(employee =>
      employee.ci.toLowerCase().includes(query.toLowerCase()) ||
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.department.toLowerCase().includes(query.toLowerCase()) ||
      employee.position.toLowerCase().includes(query.toLowerCase()) ||
      employee.salary.toLowerCase().includes(query.toLowerCase()) ||
      employee.startDate.toLowerCase().includes(query.toLowerCase()) ||
      employee.phone.toLowerCase().includes(query.toLowerCase()) ||
      employee.email.toLowerCase().includes(query.toLowerCase()) ||
      employee.address.toLowerCase().includes(query.toLowerCase()) ||
      employee.birthDate.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddEditEmployee = (employeeData) => {
    if (currentEmployee) {
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? employeeData : emp));
      setFilteredEmployees(filteredEmployees.map(emp => emp.id === currentEmployee.id ? employeeData : emp));
    } else {
      const newEmployee = { ...employeeData, id: employees.length + 1 };
      setEmployees([...employees, newEmployee]);
      setFilteredEmployees([...filteredEmployees, newEmployee]);
    }
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">Empleados</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
      <SearchBar placeholder="Buscar empleados..." onSearch={handleSearch} />
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
        title={currentEmployee ? "Editar empleado" : "Agregar Empleado"}
      >
        <FormEmployees employee={currentEmployee} onSubmit={handleAddEditEmployee} />
      </Modal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        article="el"
        entityName="empleado"
      />
    </div>
  );
};

export default Employees;
