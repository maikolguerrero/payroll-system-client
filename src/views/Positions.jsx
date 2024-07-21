
import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import FormPositions from "../components/forms/FormPositions";
import { Contexto } from "../context/Contexto";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { alertConfirm, alertError } from "../components/alerts/alerts";

const columns = [
  { label: "Nombre", accessor: "name" },
  { label: "Descripción", accessor: "description" },
  { label: "Salario Base", accessor: "base_salary" },
  { label: "Horas Diarias", accessor: "daily_hours" },
  { label: "Periodo", accessor: "period" },
  { label: "Días de trabajo", accessor: "work_days" },
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
  const { positionsData, setPositionsData, peticionGet, peticionDelete } =
    useContext(Contexto);

  const [positions, setPositions] = useState(positionsData);
  const [filteredPositions, setFilteredPositions] = useState(positionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/positions/all",
        "GET"
      );
      setPositionsData(respuesta);
      setPositions(respuesta);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    setFilteredPositions(positionsData);
  }, [positionsData]);

  const openAddModal = () => {
    setCurrentPosition(null);
    setIsModalOpen(true);
  };

  const openEditModal = (position) => {
    setCurrentPosition(position);
    setIsModalOpen(true);
  };

  const openDeleteModal = (position) => {
    setCurrentPosition(position);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    setPositions(
      positions.filter((posit) => posit._id !== currentPosition._id)
    );
    setFilteredPositions(
      filteredPositions.filter((posit) => posit._id !== currentPosition._id)
    );
    // Lógica de eliminación
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/positions/${currentPosition._id}`,
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
      work_days: abreviarDias(position.work_days),
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
          pos.id === currentPosition.id
            ? { ...formattedPositionData, id: currentPosition.id }
            : pos
        )
      );
      setFilteredPositions(
        filteredPositions.map((pos) =>
          pos.id === currentPosition.id
            ? { ...formattedPositionData, id: currentPosition.id }
            : pos
        )
      );
    } else {
      const newPosition = {
        ...formattedPositionData,
        id: positions.length + 1,
      };
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
      {positions.length === 0 ? (
        <>
          <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
            No hay Cargos registrados...
          </h3>
        </>
      ) : (
        <>
          <Table columns={columns} data={currentItems} onDelete={openDeleteModal} onEdit={openEditModal} />
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
        title={currentPosition ? "Editar cargo" : "Agregar cargo"}
      >
        <FormPositions
          position={currentPosition}
          onSubmit={handleAddEditPosition}
          onClose={closeModal}
        />
      </Modal>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        article="el"
        entityName="puesto"
      />
    </div>
  );
};

export default Positions;
