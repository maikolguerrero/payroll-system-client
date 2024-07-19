import { Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function FormDeductions({ submit, current, table }) {
  const [state, setState] = useState({});

  useEffect(() => {
    if (current != null) {
      setState(current);
    }
  }, []);

  return (
    <>
      <form className="p-8 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-x-12 w-full">
          {/* Campo Banco */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Fecha */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha
            </label>
            <input
              type="date"
              id="date"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Tipo */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Tipo
            </label>
            <select
              id="type"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            >
              <option value=""></option>
            </select>
          </div>
          {/* Campo Monto */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Monto
            </label>
            <input
            min={0}
              type="number"
              id="amount"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
        </div>
        {/* Campo Descripcion */}
        <div className="mb-4 w-full">
            <label
              htmlFor="description"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Descripción
            </label>
            <textarea
            min={0}
              type="text"
              id="description"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
        <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
          {submit}
        </button>
      </form>
    </>
  );
}
