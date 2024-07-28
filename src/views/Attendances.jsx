import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import AddButton from '../components/AddButton';
import Modal from '../components/Modal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import FormAttendance from '../components/forms/FormAttendance';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { Contexto } from '../context/Contexto';
import { alertConfirm, alertError } from '../components/alerts/alerts';

const columns = [
  { label: "Cédula", accessor: "ci" },
  { label: "Nombre", accessor: "employee_name" },
  { label: "Departamento", accessor: "department" },
  { label: "Cargo", accessor: "position" },
  { label: "Fecha", accessor: "date" },
  { label: "Hora Ingreso", accessor: "entry_time" },
  { label: "Hora Salida", accessor: "exit_time" },
  { label: "Horas Trabajadas", accessor: "hours_worked" },
];

const ITEMS_PER_PAGE = 10;

export default function Attendances() {
  const { peticionGet, employeesData, setEmployeesData, peticionDelete, departmentsData, positionsData } = useContext(Contexto);

  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [originalAttendances, setOriginalAttendances] = useState([]); // Datos originales
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    setCurrentDate(formattedDate);
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchAttendancesForDate = async () => {
      if (date) {
        const attendancesResponse = await peticionGet(`http://localhost:3000/api/attendances/date/${date}`, "GET");
        const employeesResponse = await peticionGet("http://localhost:3000/api/employees/all", "GET");
        setEmployeesData(employeesResponse);

        const attendancesWithDetails = attendancesResponse.map(attendance => {
          const employee = employeesResponse.find(emp => emp._id === attendance.employee_id);
          const department = departmentsData.find(dept => dept._id === employee?.department_id)?.name || 'Desconocido';
          const position = positionsData.find(pos => pos._id === employee?.position_id)?.name || 'Desconocido';

          return {
            ...attendance,
            "date": attendance.date.split("T00:00:00.000Z").join(''),
            ci: employee?.ci || 'Desconocido',
            employee_name: employee ? `${employee.name} ${employee.surnames}` : 'Desconocido',
            department,
            position,
          };
        });

        setOriginalAttendances(attendancesWithDetails); // Guardar los datos originales
        setFilteredAttendances(attendancesWithDetails); // Inicializar la lista filtrada
      }
    };

    fetchAttendancesForDate();
  }, [date, setEmployeesData]);

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
    if (query === null || query.trim() === '') {
      setFilteredAttendances(originalAttendances); // Restaurar los datos originales si la consulta está vacía
    } else {
      const filtered = originalAttendances.filter(attendance =>
        attendance.ci.toLowerCase().includes(query.toLowerCase()) ||
        attendance.employee_name.toLowerCase().includes(query.toLowerCase()) ||
        attendance.department.toLowerCase().includes(query.toLowerCase()) ||
        attendance.position.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAttendances(filtered);
    }
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const handleReset = () => {
    setFilteredAttendances(originalAttendances); // Restaurar los datos originales
    setCurrentPage(1); // Resetea la página actual
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
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  const handleDelete = async () => {
    setFilteredAttendances(filteredAttendances.filter((item) => item._id !== currentAttendance._id));
    setOriginalAttendances(filteredAttendances.filter((item) => item._id !== currentAttendance._id));
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/attendances/${currentAttendance._id}`,
      "DELETE"
    );
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError(respuesta.error);
    }
    closeModals();
  };

  const updateAttendances = async () => {
    const fetchAttendancesForDate = async () => {
      if (date) {
        const attendancesResponse = await peticionGet(`http://localhost:3000/api/attendances/date/${date}`, "GET");
        const employeesResponse = await peticionGet("http://localhost:3000/api/employees/all", "GET");
        setEmployeesData(employeesResponse);

        const attendancesWithDetails = attendancesResponse.map(attendance => {
          const employee = employeesResponse.find(emp => emp._id === attendance.employee_id);
          const department = departmentsData.find(dept => dept._id === employee?.department_id)?.name || 'Desconocido';
          const position = positionsData.find(pos => pos._id === employee?.position_id)?.name || 'Desconocido';

          return {
            ...attendance,
            "date": attendance.date.split("T00:00:00.000Z").join(''),
            ci: employee?.ci || 'Desconocido',
            employee_name: employee ? `${employee.name} ${employee.surnames}` : 'Desconocido',
            department,
            position,
          };
        });

        setOriginalAttendances(attendancesWithDetails); // Guardar los datos originales
        setFilteredAttendances(attendancesWithDetails); // Inicializar la lista filtrada
      }
    };

    fetchAttendancesForDate();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">
        Asistencias {date && `- ${formatDate(date)}`}
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
        <div className="w-full sm:w-auto">
          <SearchBar placeholder="Buscar asistencias..." onSearch={handleSearch} onReset={handleReset} />
        </div>
        <div className="sm:w-auto flex items-center gap-2">
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
      {filteredAttendances.length === 0 ? (
        <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
          No hay asistencias registradas...
        </h3>
      ) : (
        <>
          <Table columns={columns} data={currentItems} onEdit={openEditModal} onDelete={openDeleteModal} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <AddButton openModal={openAddModal} />
      <Modal isOpen={isModalOpen} onClose={closeModals} title={currentAttendance ? "Editar asistencia" : "Registrar nueva asistencia"}>
        <FormAttendance employees={employeesData} onSubmit={updateAttendances} onClose={closeModals} current={currentAttendance} />
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