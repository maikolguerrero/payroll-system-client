import React from 'react';
import Modal from './Modal';

export default function ConfirmDeleteModal({ isOpen, onClose, onDelete, entityName, article }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Eliminar ${entityName}`}>
      <p>¿Estás seguro de que quieres eliminar {article} {entityName}?</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
}
