import React, { useState } from 'react';
import Modal from '../components/Modal';
import AddButton from '../components/AddButton';
import FormEmployees from '../components/forms/FormEmployees';

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const openAddModal = () => {
    setCurrentEmployee(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-left">Empleados</h1>
      <AddButton openModal={openAddModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentEmployee ? "Editar empleado" : "Agregar Empleado"}
      >
        <FormEmployees employee={currentEmployee} />
      </Modal>
    </div>
  );
};

export default Employees;
