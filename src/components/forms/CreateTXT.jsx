import { Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function CreateTXT({ submit }) {

  return (
    <>
      <form className="p-8 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-x-12 w-full">
          {/* Campo Fecha Inicio */}
          <div className="mb-4">
            <label
              htmlFor="dateStart"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha Inicio
            </label>
            <input
              type="date"
              id="dateStart"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Fecha Fin */}
          <div className="mb-4">
            <label
              htmlFor="dateEnd"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha Fin
            </label>
            <input
              type="date"
              id="dateEnd"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Banco */}
          <div className="mb-4">
            <label
              htmlFor="bank"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Banco
            </label>
            <select
              type="text"
              id="bank"
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            >
              <option value=""></option>
            </select>
          </div>
        </div>
        <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
          Generar TXT
        </button>
      </form>
    </>
  );
}