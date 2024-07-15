import React from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative p-4 w-full max-w-2xl max-h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-700"
        >
          <FiX className="w-6 h-6" />
        </button>
        <div className="p-4 md:p-6">
          <h2 className="text-2xl text-center font-bold mb-2">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
