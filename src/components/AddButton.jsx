import React from 'react';
import { FiPlus } from 'react-icons/fi';

export default function AddButton({ openModal }) {

  return (
    <button
      onClick={openModal}
      className="fixed bottom-6 right-6 bg-white text-black border-2 border-black rounded-full p-4 shadow-lg hover:bg-principalAzulTono5 hover:text-white focus:outline-none focus:ring-2 focus:ring-principalAzulTono3 focus:ring-offset-2"
    >
      <FiPlus className="w-6 h-6"/>
    </button>
  )
}