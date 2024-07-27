import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar({ placeholder, onSearch, onReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    onSearch(query);
  };

  const handleReset = () => {
    onReset(); // Llama a la función para restablecer la búsqueda
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <div className="relative w-80 max-w-md">
        <input
          type="search"
          id="default-search"
          name="search"
          className="block w-full p-2 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-principalAzulTono5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-principalAzulTono5"
          placeholder={placeholder}
          required
        />
        <div className="absolute inset-y-0 end-0 flex items-center space-x-1 pe-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center px-2 text-white bg-red-500 hover:bg-red-600 focus:ring-1 focus:outline-none focus:ring-red-500 font-medium rounded-l-lg text-xs py-1 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-500"
          >
            <FaTimes className="w-4 h-4" />
            <span className="ms-1 hidden md:inline">Resetear</span>
          </button>
          <button
            type="submit"
            className="flex items-center justify-center px-2 text-white bg-principalAzulTono5 hover:bg-principalAzulTono3 focus:ring-1 focus:outline-none focus:ring-principalAzulTono5 font-medium rounded-r-lg text-xs py-1 dark:bg-principalAzulTono5 dark:hover:bg-principalAzulTono2 dark:focus:ring-principalAzulTono5"
          >
            <FaSearch className="w-4 h-4" />
            <span className="ms-1 hidden md:inline">Buscar</span>
          </button>
        </div>
      </div>
    </form>
  );
}