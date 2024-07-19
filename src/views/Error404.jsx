// src/views/Error404.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-principalAzul text-white p-4">
      <FaExclamationTriangle className="text-9xl mb-8 text-white" />
      <h1 className="text-5xl font-bold mb-4 font-roboto-serif">Error 404</h1>
      <p className="text-2xl font-nunito mb-6">La página que buscas no existe.</p>
      <a
        href="/"
        className="bg-principalAzulTono5 hover:bg-principalAzulTono4 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Volver al inicio
      </a>
    </div>
  );
};

export default Error404;