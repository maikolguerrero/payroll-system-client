import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

export default function FormPayrollDepartments() {
  return (
    <form className="p-8 flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl">
      {/* Campo Departamento */}
      <div className="mb-4 w-full">
        <label
          htmlFor="departments"
          className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
        >
          Departamento
        </label>
        <select
          id="departments"
          aria-label="Seleccionar departamento"
          className="shadow-md appearance-none border-transparent rounded-lg w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-principalAzulTono5 dark:focus:ring-blue-400"
        >
          <option value="" disabled>Seleccionar</option>
          {/* Agregar opciones aquí */}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-x-12 w-full">
        {/* Campo Empleado */}
        <div className="mb-4">
          <label
            htmlFor="employe"
            className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
          >
            Empleado
          </label>
          <select
            id="employe"
            aria-label="Seleccionar empleado"
            className="shadow-md appearance-none border-transparent rounded-lg w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-principalAzulTono5 dark:focus:ring-blue-400"
          >
            <option value="" disabled>Seleccionar</option>
            {/* Agregar opciones aquí */}
          </select>
        </div>

        {/* Campo Buscar Empleado */}
        <div className="mb-4 relative">
          <label
            htmlFor="search"
            className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
          >
            Buscar Empleado
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              aria-label="Buscar empleado"
              className="shadow-md appearance-none border-transparent rounded-lg w-full py-2 pl-10 pr-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-principalAzulTono5 dark:focus:ring-blue-400"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>

      {/* Campo Deducciones */}
      <div className="mb-4 mt-8 w-full">
        <label
          htmlFor="deductions"
          className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
        >
          Deducciones
        </label>
        <div className="flex gap-4">
          <select
            id="deductions"
            aria-label="Seleccionar deducción"
            className="shadow-md appearance-none border-transparent rounded-lg w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-principalAzulTono5 dark:focus:ring-blue-400"
          >
            <option value="" disabled>Seleccionar</option>
            {/* Agregar opciones aquí */}
          </select>
          <IoIosAddCircle className="text-4xl text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Campo Percepciones */}
      <div className="mb-4 w-full">
        <label
          htmlFor="perceptions"
          className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
        >
          Percepciones
        </label>
        <div className="flex gap-4">
          <select
            id="perceptions"
            aria-label="Seleccionar percepción"
            className="shadow-md appearance-none border-transparent rounded-lg w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-principalAzulTono5 dark:focus:ring-blue-400"
          >
            <option value="" disabled>Seleccionar</option>
            {/* Agregar opciones aquí */}
          </select>
          <IoIosAddCircle className="text-4xl text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors" />
        </div>
      </div>

      <h4 className="mt-4 text-gray-900 dark:text-gray-200 font-bold text-lg">
        Agregados 1 de 100
      </h4>
      <div className="flex gap-8 mt-8">
        <button
          type="button"
          className="rounded-xl bg-principalAzulTono5 dark:bg-blue-600 px-12 py-2 text-white text-xl hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-principalAzulTono5 dark:focus:ring-blue-400"
        >
          Agregar Empleado
        </button>
        <button
          type="button"
          className="rounded-xl bg-principalAzulTono5 dark:bg-blue-600 px-12 py-2 text-white text-xl hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-principalAzulTono5 dark:focus:ring-blue-400"
        >
          Cerrar Nómina
        </button>
      </div>
    </form>
  );
}
