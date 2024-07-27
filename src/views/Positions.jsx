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
  const [originalPositionsData, setOriginalPositionsData] = useState([]);
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
      setOriginalPositionsData(respuesta); // Guardar los datos originales
      setFilteredPositions(respuesta);
    };

    realizarPeticion();
  }, []);

  useEffect(() => {
    setFilteredPositions(positionsData);
  }, [positionsData]);

  const handleSearch = (query) => {
    if (query === null || query.trim() === "") {
      // Restaurar los datos originales si la consulta está vacía
      setFilteredPositions(originalPositionsData);
    } else {
      // Filtrar los datos según la consulta en todos los campos relevantes
      const filtered = originalPositionsData.filter(
        (position) =>
          position.name.toLowerCase().includes(query.toLowerCase()) ||
          position.description.toLowerCase().includes(query.toLowerCase()) ||
          position.base_salary.toString().includes(query.toLowerCase()) ||
          position.daily_hours.toString().includes(query.toLowerCase()) ||
          position.period.toLowerCase().includes(query.toLowerCase()) ||
          position.work_days.some((dia) =>
            dia.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredPositions(filtered);
    }
    setCurrentPage(1); // Resetea la página actual al buscar
  };

  const handleReset = () => {
    setFilteredPositions(originalPositionsData); // Restaurar los datos originales
    setCurrentPage(1); // Resetea la página actual
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    setPositions(
      positions.filter((posit) => posit._id !== currentPosition._id)
    );
    setFilteredPositions(
      filteredPositions.filter((posit) => posit._id !== currentPosition._id)
    );
    setPositionsData(filteredPositions.filter((posit) => posit._id !== currentPosition._id))
    // Lógica de eliminación
    const respuesta = await peticionDelete(
      `http://localhost:3000/api/positions/${currentPosition._id}`,
      "DELETE"
    );
    console.log(respuesta);
    if (respuesta.message) {
      alertConfirm(respuesta.message);
    } else {
      alertError("Ocurrió un error. Revisa la consola.");
    }
    closeDeleteModal();
  };

  const handleAddEditPosition = (positionData) => {
    const formattedPositionData = {
      ...positionData,
      work_days: Array.isArray(positionData.work_days)
        ? positionData.work_days
        : [],
    };

    if (currentPosition) {
      setPositions(
        positions.map((pos) =>
          pos._id === currentPosition._id
            ? { ...formattedPositionData, _id: currentPosition._id }
            : pos
        )
      );
      setFilteredPositions(
        filteredPositions.map((pos) =>
          pos._id === currentPosition._id
            ? { ...formattedPositionData, _id: currentPosition._id }
            : pos
        )
      );
    } else {
      const newPosition = {
        ...formattedPositionData,
        _id: positions.length + 1, // Simulando un ID único; ajusta según tu lógica
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
        <SearchBar
          placeholder="Buscar cargos..."
          onSearch={handleSearch}
          onReset={handleReset} // Añadir función de resetear
        />
      </div>
      {filteredPositions.length === 0 ? (
        <h3 className="text-2xl text-white font-bold mt-8 mb-4 text-center">
          No hay cargos registrados...
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
        entityName="cargo"
      />
    </div>
  );
};

export default Positions;
