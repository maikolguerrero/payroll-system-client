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
  const { employeesData, setEmployeesData, setDepartmentsData, setPositionsData, peticionGet, peticionDelete } =
    useContext(Contexto);

  const [employees, setEmployees] = useState(employeesData);
  const [filteredEmployees, setFilteredEmployees] = useState(employeesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/employees/all",
        "GET"
      );
      setEmployeesData(respuesta);
      setEmployees(respuesta);
      const respusta2 = await peticionGet(
        "http://localhost:3000/api/departments/all",
        "GET"
      );
      setDepartmentsData(respusta2);
      const respusta3 = await peticionGet(
        "http://localhost:3000/api/positions/all",
        "GET"
      );
      setPositionsData(respusta3);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    setFilteredEmployees(employeesData);
  }, [employeesData]);

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
    setEmployees(employees.filter((emp) => emp._id !== currentEmployee._id));
    setFilteredEmployees(
      filteredEmployees.filter((emp) => emp._id !== currentEmployee._id)
    );
    // Lógica de eliminación
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/employees/${currentEmployee._id}`,
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
    const filtered = employees.filter(
      (employee) =>
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
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddEditEmployee = (employeeData) => {
    if (currentEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === currentEmployee.id ? employeeData : emp
        )
      );
      setFilteredEmployees(
        filteredEmployees.map((emp) =>
          emp.id === currentEmployee.id ? employeeData : emp
        )
      );
    } else {
      const newEmployee = { ...employeeData, id: employees.length + 1 };
      setEmployees([...employees, newEmployee]);
      setFilteredEmployees([...filteredEmployees, newEmployee]);
    }
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white dark:text-gray-100 font-bold mb-4 text-left"">
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
