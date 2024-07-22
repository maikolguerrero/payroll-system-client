import React from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
      <div className="bg-white dark:bg-gray-800 rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] dark:drop-shadow-md w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400"
        >
          <FiX className="w-6 h-6" />
        </button>
        <div className="p-4 md:p-6">
          <h2 className="text-2xl text-center font-bold mb-2 text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
