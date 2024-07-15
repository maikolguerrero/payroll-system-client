import React, { useState } from 'react';
import Modal from '../components/Modal';
import AddButton from '../components/AddButton';
import FormDepartments from '../components/forms/FormDepartments';

const Departments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);

  const openAddModal = () => {
    setCurrentDepartment(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">Departamentos</h1>
      <AddButton openModal={openAddModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentDepartment ? "Editar departamento" : "Agregar Departamento"}
      >
        <FormDepartments department={currentDepartment} />
      </Modal>
    </div>
  );
};

export default Departments;
