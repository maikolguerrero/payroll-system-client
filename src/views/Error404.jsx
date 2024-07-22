import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-principalAzul dark:bg-gray-900 text-white dark:text-gray-100 p-4">
      <FaExclamationTriangle className="text-9xl mb-8 text-white dark:text-gray-400" />
      <h1 className="text-5xl font-bold mb-4 font-roboto-serif">
        Error 404
      </h1>
      <p className="text-2xl font-nunito mb-6">
        La página que buscas no existe.
      </p>
      <a
        href="/"
        className="bg-principalAzulTono5 dark:bg-blue-600 hover:bg-principalAzulTono4 dark:hover:bg-blue-500 text-white dark:text-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Volver al inicio
      </a>
    </div>
  );
};

export default Error404;
