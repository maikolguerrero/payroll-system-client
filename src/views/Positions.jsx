import React, { useState } from "react";
import Modal from "../components/Modal";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import FormPositions from "../components/forms/FormPositions";

const positionsData = [
  {
    id: 1,
    nombre: "Desarrollador",
    descripcion: "Desarrollador de software",
    salarioBase: 50000,
    horasDiarias: 8,
    periodo: "Mensual",
    diasTrabajo: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  },
  {
    id: 2,
    nombre: "Gerente",
    descripcion: "Gerente de proyectos",
    salarioBase: 70000,
    horasDiarias: 8,
    periodo: "Mensual",
    diasTrabajo: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  },
];

const columns = [
  { label: "Nombre", accessor: "nombre" },
  { label: "Descripción", accessor: "descripcion" },
  { label: "Salario Base", accessor: "salarioBase" },
  { label: "Horas Diarias", accessor: "horasDiarias" },
  { label: "Periodo", accessor: "periodo" },
  { label: "Días de trabajo", accessor: "diasTrabajo" },
];

const ITEMS_PER_PAGE = 10;

const abreviarDias = (dias) => {
  const mapaDias = {
    Lunes: "Lun",
    Martes: "Mar",
    Miércoles: "Mié",
    Jueves: "Jue",
    Viernes: "Vie",
    Sábado: "Sáb",
    Domingo: "Dom",
  };
  return dias.map((dia) => mapaDias[dia] || dia).join(", ");
};

const Positions = () => {
  const [positions, setPositions] = useState(positionsData);
  const [filteredPositions, setFilteredPositions] = useState(positionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);

  const openAddModal = () => {
    setCurrentPosition(null);
    setIsModalOpen(true);
  };

  const openEditModal = (position) => {
    setCurrentPosition(position);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (query) => {
    const filtered = positions.filter(
      (position) =>
        position.nombre.toLowerCase().includes(query.toLowerCase()) ||
        position.descripcion.toLowerCase().includes(query.toLowerCase()) ||
        position.salarioBase.toString().includes(query.toLowerCase()) ||
        position.horasDiarias.toString().includes(query.toLowerCase()) ||
        position.periodo.toLowerCase().includes(query.toLowerCase()) ||
        position.diasTrabajo.some((dia) =>
          dia.toLowerCase().includes(query.toLowerCase())
        )
    );
    setFilteredPositions(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredPositions
    .slice(indexOfFirstItem, indexOfLastItem)
    .map((position) => ({
      ...position,
      diasTrabajo: abreviarDias(position.diasTrabajo),
    }));
  const totalPages = Math.ceil(filteredPositions.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddEditPosition = (positionData) => {
    const formattedPositionData = {
      ...positionData,
      diasTrabajo: Array.isArray(positionData.diasTrabajo)
        ? positionData.diasTrabajo
        : [],
    };

    if (currentPosition) {
      setPositions(
        positions.map((pos) =>
          pos.id === currentPosition.id ? { ...formattedPositionData, id: currentPosition.id } : pos
        )
      );
      setFilteredPositions(
        filteredPositions.map((pos) =>
          pos.id === currentPosition.id ? { ...formattedPositionData, id: currentPosition.id } : pos
        )
      );
    } else {
      const newPosition = { ...formattedPositionData, id: positions.length + 1 };
      setPositions([...positions, newPosition]);
      setFilteredPositions([...filteredPositions, newPosition]);
    }
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">Cargos</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
        <SearchBar placeholder="Buscar cargos..." onSearch={handleSearch} />
      </div>
      <Table columns={columns} data={currentItems} onEdit={openEditModal} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddButton openModal={openAddModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentPosition ? "Editar cargo" : "Agregar cargo"}
      >
        <FormPositions
          position={currentPosition}
          onSubmit={handleAddEditPosition}
        />
      </Modal>
    </div>
  );
};

export default Positions;
