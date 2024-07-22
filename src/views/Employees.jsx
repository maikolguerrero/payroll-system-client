import React, { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import FormEmployees from "../components/forms/FormEmployees";
import { Contexto } from "../context/Contexto";
import { alertConfirm, alertError } from "../components/alerts/alerts";

const columns = [
  { label: "CI", accessor: "ci" },
  { label: "Nombre", accessor: "name" },
  { label: "Departamento", accessor: "department_id" },
  { label: "Cargo", accessor: "position_id" },
  { label: "Salario", accessor: "base_salary" },
  { label: "Fecha Ingreso", accessor: "hire_date" },
  { label: "Teléfono", accessor: "phone" },
  { label: "Correo", accessor: "email" },
  { label: "Dirección", accessor: "address" },
  { label: "Fecha de Nacimiento", accessor: "birthdate" },
];

const ITEMS_PER_PAGE = 10;

const Employees = () => {
  const { employeesData, setEmployeesData, setDepartmentsData, setPositionsData, peticionGet, peticionDelete } = useContext(Contexto);

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesResponse, departmentsResponse, positionsResponse] = await Promise.all([
          peticionGet("http://localhost:3000/api/employees/all", "GET"),
          peticionGet("http://localhost:3000/api/departments/all", "GET"),
          peticionGet("http://localhost:3000/api/positions/all", "GET")
        ]);
        setEmployeesData(employeesResponse);
        setEmployees(employeesResponse);
        setDepartmentsData(departmentsResponse);
        setPositionsData(positionsResponse);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [peticionGet, setEmployeesData, setDepartmentsData, setPositionsData]);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

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

  const handleDelete = async () => {
    try {
      await peticionDelete(`http://localhost:3000/api/employees/${currentEmployee._id}`, "DELETE");
      const updatedEmployees = employees.filter((emp) => emp._id !== currentEmployee._id);
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
      alertConfirm("Empleado eliminado exitosamente");
    } catch (error) {
      alertError("Ocurrio un Error Revisa la Consola");
    }
    closeDeleteModal();
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.ci.toLowerCase().includes(lowercasedQuery) ||
        employee.name.toLowerCase().includes(lowercasedQuery) ||
        employee.department.toLowerCase().includes(lowercasedQuery) ||
        employee.position.toLowerCase().includes(lowercasedQuery) ||
        employee.salary.toLowerCase().includes(lowercasedQuery) ||
        employee.startDate.toLowerCase().includes(lowercasedQuery) ||
        employee.phone.toLowerCase().includes(lowercasedQuery) ||
        employee.email.toLowerCase().includes(lowercasedQuery) ||
        employee.address.toLowerCase().includes(lowercasedQuery) ||
        employee.birthDate.toLowerCase().includes(lowercasedQuery)
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
      const updatedEmployees = employees.map((emp) =>
        emp.id === currentEmployee.id ? employeeData : emp
      );
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
    } else {
      const newEmployee = { ...employeeData, id: employees.length + 1 };
      const updatedEmployees = [...employees, newEmployee];
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
    }
    closeModal();
  };

  return (
    <div className="p-4 bg-principalAzul dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">
        Empleados
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
        <SearchBar placeholder="Buscar empleados..." onSearch={handleSearch} />
      </div>
      {employees.length === 0 ? (
        <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
          No hay empleados registrados...
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
        title={currentEmployee ? "Editar empleado" : "Agregar Empleado"}
      >
        <FormEmployees
          employee={currentEmployee}
          onSubmit={handleAddEditEmployee}
          onClose={closeModal}
        />
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
