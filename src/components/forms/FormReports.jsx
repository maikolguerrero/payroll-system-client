import React, { useEffect, useState } from "react";

export default function FormReports({ submit }) {
  return (
    <section className="w-full h-full flex justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-6xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-200">
          Generar Reportes
        </h2>

        <form action="" className="px-2 sm:px-12 py-8">
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">
              Tipo de Reporte:
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:w-full xl:w-2/3">
              <div className="flex items-center">
                <label htmlFor="employe" className="font-medium text-gray-900 dark:text-gray-200">
                  Empleado
                </label>
                <input
                  type="checkbox"
                  id="employe"
                  className="form-checkbox h-5 w-5 ml-2 text-principalAzulTono4 dark:text-principalAzulTono4"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="departments" className="font-medium text-gray-900 dark:text-gray-200">
                  Departamento
                </label>
                <input
                  type="checkbox"
                  id="departments"
                  className="form-checkbox h-5 w-5 ml-2 text-principalAzulTono4 dark:text-principalAzulTono4"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="positions" className="font-medium text-gray-900 dark:text-gray-200">
                  Cargo
                </label>
                <input
                  type="checkbox"
                  id="positions"
                  className="form-checkbox h-5 w-5 ml-2 text-principalAzulTono4 dark:text-principalAzulTono4"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="bank" className="font-medium text-gray-900 dark:text-gray-200">
                  Banco
                </label>
                <input
                  type="checkbox"
                  id="bank"
                  className="form-checkbox h-5 w-5 ml-2 text-principalAzulTono4 dark:text-principalAzulTono4"
                />
              </div>
            </div>
          </div>

          {/* Campo Tipo de Cuenta */}
          <div className="mb-4 lg:w-2/3">
            <label
              htmlFor="select"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              Empleado / Cargo / Departamento / Banco
            </label>
            <select
              id="select"
              className="shadow appearance-none border border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            >
              <option value=""></option>
            </select>
          </div>

          {/* Campo Fecha Inicio */}
          <div className="mb-4 lg:w-2/3">
            <label
              htmlFor="dateStart"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              Fecha Inicio
            </label>
            <input
              type="date"
              id="dateStart"
              className="shadow appearance-none border border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            />
          </div>

          {/* Campo Fecha Fin */}
          <div className="mb-4 lg:w-2/3">
            <label
              htmlFor="dateEnd"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              Fecha Fin
            </label>
            <input
              type="date"
              id="dateEnd"
              className="shadow appearance-none border border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700"
            />
          </div>

          <div className="w-full flex justify-center">
            <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
              Generar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
