import React, { useState } from 'react';
import Modal from '../components/Modal';
import AddButton from '../components/AddButton';
import FormPositions from '../components/forms/FormPositions';

const Positions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);

  const openAddModal = () => {
    setCurrentPosition(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">Cargos</h1>
      <AddButton openModal={openAddModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentPosition ? "Editar cargo" : "Agregar cargo"}
      >
        <FormPositions position={currentPosition} />
      </Modal>
    </div>
  );
};

export default Positions;
