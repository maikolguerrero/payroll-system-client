import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

export default function FormEmployeesOne() {
  return (
    <form className="p-8 flex flex-col items-center bg-white dark:bg-gray-800 rounded-[10px] w-full max-w-4xl">
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
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
          >
            <option value=""></option>
          </select>
        </div>
        {/* Campo Debounce */}
        <div className="mb-4 relative">
          <label
            htmlFor="search"
            className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
          >
            Buscar Empleado
          </label>
          <FaSearch className="absolute top-11 left-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            id="search"
            className="shadow appearance-none border-transparent rounded-[20px] w-full py-2 pl-10 pr-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
          />
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
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
          >
            <option value=""></option>
          </select>
          <IoIosAddCircle className="text-4xl text-gray-800 dark:text-gray-200 hover:cursor-pointer" />
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
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
          >
            <option value=""></option>
          </select>
          <IoIosAddCircle className="text-4xl text-gray-800 dark:text-gray-200 hover:cursor-pointer" />
        </div>
      </div>
      <button className="rounded-xl bg-principalAzulTono5 dark:bg-blue-600 px-12 py-2 mt-12 text-white text-xl hover:bg-blue-800 dark:hover:bg-blue-500">
        Cerrar Nómina
      </button>
    </form>
  );
}
