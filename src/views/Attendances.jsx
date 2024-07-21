import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import AddButton from '../components/AddButton';
import Modal from '../components/Modal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import FormAttendance from '../components/forms/FormAttendance'; // Actualizado
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate y useLocation
import { Contexto } from '../context/Contexto';
import { alertConfirm, alertError } from '../components/alerts/alerts';

const columns = [
  { label: "Nombre", accessor: "employee_id" },
  { label: "Fecha", accessor: "date" },
  { label: "Hora Ingreso", accessor: "entry_time" },
  { label: "Hora Salida", accessor: "exit_time" },
  { label: "Horas Trabajadas", accessor: "hours_worked" },
];

const ITEMS_PER_PAGE = 10; // Número de elementos por página

export default function Attendances() {
  const {attendances, setAttendances, peticionGet, employeesData, setEmployeesData, peticionDelete} = useContext(Contexto);

  const [filteredAttendances, setFilteredAttendances] = useState(attendances);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate(); // Usar useNavigate para la navegación
  const location = useLocation(); // Usar useLocation para acceder a la ubicación actual

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    setCurrentDate(formattedDate);
    setDate(formattedDate);

    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/attendances/all",
        "GET"
      );
      const respuesta2 = await peticionGet(
        "http://localhost:3000/api/employees/all",
        "GET"
      );
      setEmployeesData(respuesta2)
      setAttendances(respuesta);
      setFilteredAttendances(respuesta);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    if (date) {
      const queryParams = new URLSearchParams();
      queryParams.set('date', date);
      navigate(`?${queryParams.toString()}`);
    }
  }, [date, navigate]);

  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'd ' + "'de'" + ' MMMM ' + "'de'" + ' yyyy', { locale: es });
  };

  const handleSearch = (query) => {
    const filtered = attendances.filter(attendance =>
      attendance.ci.toLowerCase().includes(query.toLowerCase()) ||
      attendance.name.toLowerCase().includes(query.toLowerCase()) ||
      attendance.department.toLowerCase().includes(query.toLowerCase()) ||
      attendance.position.toLowerCase().includes(query.toLowerCase()) ||
      attendance.date.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAttendances(filtered);
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredAttendances.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAttendances.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openAddModal = () => {
    setCurrentAttendance(null);
    setIsModalOpen(true);
  };

  const openEditModal = (attendance) => {
    setCurrentAttendance(attendance);
    setIsModalOpen(true);
  };

  const openDeleteModal = (attendance) => {
    setCurrentAttendance(attendance);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    setFilteredAttendances(filteredAttendances.filter((item) => item._id !== currentAttendance._id));
    // Lógica de eliminación
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/attendances/${currentAttendance._id}`,
      "DELETE"
    );
    console.log(respuesta);
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError("Ocurrio un Error Revisa la Consola");
    }
    closeModals();
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  const handleAddAttendance = (attendanceData) => {
    // Lógica para agregar la asistencia
    console.log(attendanceData);
    closeModals();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">
        Asistencias {date && `- ${formatDate(date)}`}
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
        <div className="w-full sm:w-auto">
          <SearchBar placeholder="Buscar asistencias..." onSearch={handleSearch} />
        </div>
        <div className="sm:w-auto">
          <input
            type="date"
            id="attendacancesDate"
            className="w-full sm:w-auto shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 text-black leading-tight bg-white mt-2 sm:mt-0"
            value={date}
            max={currentDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <Table columns={columns} data={currentItems} onEdit={openEditModal} onDelete={openDeleteModal} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddButton openModal={openAddModal} />
      <Modal isOpen={isModalOpen} onClose={closeModals} title={currentAttendance ? "Editar asistencia" : "Registrar nueva asistencia"}>
        <FormAttendance employees={employeesData} onSubmit={handleAddAttendance} current={currentAttendance} />
      </Modal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onDelete={handleDelete}
        article="la"
        entityName="asistencia" />
    </div>
  );
}