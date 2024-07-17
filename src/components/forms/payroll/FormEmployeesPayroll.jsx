import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

export default function FormEmployeesPayroll() {
  return (
    <>
      <form className="p-8 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-x-12 w-full">
          {/* Campo Empleado */}
          <div className="mb-4">
            <label
              htmlFor="employe"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Empleado
            </label>
            <select
              type="text"
              id="employe"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            >
              <option value=""></option>
            </select>
          </div>
          {/* Campo Debounce */}
          <div className="mb-4 relative">
            <label
              htmlFor="search"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Buscar Empleado
            </label>
            <FaSearch className="absolute top-11 left-4" />
            <input
              type="text"
              id="search"
              className="shadow appearance-none border-transparent rounded-[20px] w-full py-2 pl-10 pr-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
        </div>
        {/* Campo Deducciones */}
        <div className="mb-4 mt-8 w-full">
          <label
            htmlFor="deductions"
            className="block text-md font-medium font-roboto-serif mb-2"
          >
            Deduciones
          </label>
          <div className="flex gap-4">
            <select
              type="text"
              id="deductions"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            >
              <option value=""></option>
            </select>
            <IoIosAddCircle className="text-4xl text-black hover:cursor-pointer"/>
          </div>
        </div>
        {/* Campo Percepciones */}
        <div className="mb-4 w-full">
          <label
            htmlFor="perceptions"
            className="block text-md font-medium font-roboto-serif mb-2"
          >
            Percepciones
          </label>
          <div className="flex gap-4">
            <select
              type="text"
              id="perceptions"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            >
              <option value=""></option>
            </select>
            <IoIosAddCircle className="text-4xl text-black hover:cursor-pointer"/>
          </div>
        </div>
        <h4 className="mt-4 text-black font-bold text-lg">Agregados 1 de 100</h4>
        <div className="flex gap-8">
          <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
            Agregar Empleado
          </button>
          <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
            Cerrar Nómina
          </button>
        </div>
      </form>
    </>
  );
}
