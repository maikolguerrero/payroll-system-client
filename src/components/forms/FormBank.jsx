import { Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function FormBank({ submit, bank }) {

  const [state, setState] = useState({});

  useEffect(() => {
    if (bank != null) {
      setState(bank);
    }
  }, [bank]);

  return (
    <>
      <form className="p-8 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-x-12 w-full">
          {/* Campo Banco */}
          <div className="mb-4">
            <label
              htmlFor="bank"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-200 dark:text-gray-300"
            >
              Banco
            </label>
            <input
              type="text"
              id="bank"
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            />
          </div>
          {/* Campo Codigo */}
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-200 dark:text-gray-300"
            >
              Código
            </label>
            <input
              type="text"
              id="code"
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            />
          </div>
          {/* Campo Numero de Cuenta */}
          <div className="mb-4">
            <label
              htmlFor="number_account"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-200 dark:text-gray-300"
            >
              Número de Cuenta
            </label>
            <input
              type="text"
              id="number_account"
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            />
          </div>
          {/* Campo Titular */}
          <div className="mb-4">
            <label
              htmlFor="owner"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-200 dark:text-gray-300"
            >
              Titular
            </label>
            <input
              type="text"
              id="owner"
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            />
          </div>
          {/* Campo Identificación */}
          <div className="mb-4">
            <label
              htmlFor="identification"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-200 dark:text-gray-300"
            >
              Identificación
            </label>
            <input
              type="text"
              id="identification"
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            />
          </div>
          {/* Campo Tipo de Cuenta */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-200 dark:text-gray-300"
            >
              Tipo de Cuenta
            </label>
            <select
              id="type"
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            >
              <option value=""></option>
              <option value="Ahorro">Ahorro</option>
              <option value="Corriente">Corriente</option>
            </select>
          </div>
        </div>
        <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl hover:bg-principalAzulTono4">
          {submit}
        </button>
      </form>
    </>
  );
}
