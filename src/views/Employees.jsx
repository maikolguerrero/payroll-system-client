import React, { useState, useEffect, useContext } from "react";
import { format } from 'date-fns';
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
  { label: "Nombre", accessor: "full_name" },
  { label: "Departamento", accessor: "department_name" },
  { label: "Cargo", accessor: "position_name" },
  { label: "Salario", accessor: "base_salary" },
  { label: "Fecha Ingreso", accessor: "hire_date" },
  { label: "Teléfono", accessor: "phone" },
  { label: "Correo", accessor: "email" },
  { label: "Dirección", accessor: "address" },
  { label: "Fecha de Nacimiento", accessor: "birthdate" },
  { label: "Género", accessor: "gender" },
];

const ITEMS_PER_PAGE = 10;

const Employees = () => {
  const {
    employeesData,
    setEmployeesData,
    setDepartmentsData,
    setPositionsData,
    peticionGet,
    peticionDelete,
    departmentsData,
    positionsData,
  } = useContext(Contexto);

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [originalEmployeesData, setOriginalEmployeesData] = useState([]);
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
      setOriginalEmployeesData(respuesta); // Guardar los datos originales
      setFilteredEmployees(respuesta);

      const respuesta2 = await peticionGet(
        "http://localhost:3000/api/departments/all",
        "GET"
      );
      setDepartmentsData(respuesta2);

      const respuesta3 = await peticionGet(
        "http://localhost:3000/api/positions/all",
        "GET"
      );
      setPositionsData(respuesta3);
    };

    realizarPeticion();
  }, []);

  const mapData = () => {
    // Mapear los datos de empleados para incluir nombres de departamento y cargo
    const mappedData = employeesData.map((employee) => ({
      ...employee,
      full_name: `${employee.name} ${employee.surnames}`, // Crear la propiedad full_name
      department_name:
        departmentsData.find((dep) => dep._id === employee.department_id)
          ?.name || "Desconocido",
      position_name:
        positionsData.find((pos) => pos._id === employee.position_id)?.name ||
        "Desconocido",
      hire_date: employee.hire_date.split("T00:00:00.000Z").join(''), // Formatear la fecha de ingreso
      birthdate: employee.birthdate.split("T00:00:00.000Z").join(''), // Formatear la fecha de nacimiento      
    }));
    setFilteredEmployees(mappedData);
    setOriginalEmployeesData(mappedData); // Actualizar los datos originales cuando cambian
  };

  useEffect(() => {
    mapData();
  }, [employeesData, departmentsData, positionsData]);

  const handleSearch = (query) => {
    if (query === null || query.trim() === "") {
      // Restaurar los datos originales si la consulta está vacía
      setFilteredEmployees(originalEmployeesData);
    } else {
      // Filtrar los datos según la consulta en todos los campos relevantes
      const filtered = originalEmployeesData.filter((employee) =>
        employee.ci.toLowerCase().includes(query.toLowerCase()) ||
        employee.full_name.toLowerCase().includes(query.toLowerCase()) ||
        employee.department_name.toLowerCase().includes(query.toLowerCase()) ||
        employee.position_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const handleReset = () => {
    setFilteredEmployees(originalEmployeesData); // Restaurar los datos originales
    setCurrentPage(1); // Resetea la página actual
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
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError(respuesta.error);
    }
    closeDeleteModal();
  };

  const handleAddEditEmployee = (employeeData) => {
    // if (currentEmployee) {
    //   setEmployees(
    //     employees.map((emp) =>
    //       emp._id === currentEmployee._id ? employeeData : emp
    //     )
    //   );
    //   setFilteredEmployees(
    //     filteredEmployees.map((emp) =>
    //       emp._id === currentEmployee._id ? employeeData : emp
    //     )
    //   );
    // } else {
    //   const newEmployee = { ...employeeData, _id: employees.length + 1 };
    //   setEmployees([...employees, newEmployee]);
    //   setFilteredEmployees([...filteredEmployees, newEmployee]);
    // }

    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/employees/all",
        "GET"
      );
      setEmployeesData(respuesta);
      setOriginalEmployeesData(respuesta); // Guardar los datos originales
      setFilteredEmployees(respuesta);

      const respuesta2 = await peticionGet(
        "http://localhost:3000/api/departments/all",
        "GET"
      );
      setDepartmentsData(respuesta2);

      const respuesta3 = await peticionGet(
        "http://localhost:3000/api/positions/all",
        "GET"
      );
      setPositionsData(respuesta3);
    };

    realizarPeticion();

    mapData();

    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">
        Empleados
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <SearchBar
          placeholder="Buscar empleados..."
          onSearch={handleSearch}
          onReset={handleReset} // Pasar la función de resetear
        />
      </div>
      {filteredEmployees.length === 0 ? (
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