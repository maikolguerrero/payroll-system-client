import React from 'react';

export default function FormCompanyRegister() {
  return (
    <div className="flex items-center justify-center flex-grow w-full relative">
      <div className="bg-white dark:bg-gray-800 p-8 xs:p-4 rounded-[28px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] dark:drop-shadow-[25px_40px_rgba(0,0,0,0.25)] w-full max-w-4xl xs:max-h-xl mt-8 xs:mx-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Registro de la empresa
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full md:w-10/12"
            />
          </div>

          {/* Campo Dirección */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full md:w-10/12"
            />
          </div>

          {/* Campo País */}
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              País
            </label>
            <input
              type="text"
              id="country"
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full md:w-10/12"
            />
          </div>

          {/* Campo Moneda */}
          <div className="mb-4">
            <label
              htmlFor="currency"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              Moneda
            </label>
            <input
              type="text"
              id="currency"
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full md:w-10/12"
            />
          </div>

          {/* Campo Fecha de Fundación */}
          <div className="mb-4">
            <label
              htmlFor="foundationDate"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              Fecha de Fundación
            </label>
            <input
              type="date"
              id="foundationDate"
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 mobile:w-full sm:w-1/2"
            />
          </div>

          {/* Campo Logo (Opcional) */}
          <div className="mb-4">
            <label
              htmlFor="logo"
              className="block text-md font-medium font-roboto-serif mb-2 text-gray-900 dark:text-gray-200"
            >
              Logo (Opcional)
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="logo"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const fileName =
                    e.target.files.length > 0 ? e.target.files[0].name : "";
                  document.getElementById("file-name").innerText = fileName;
                }}
              />
              <button
                type="button"
                onClick={() => document.getElementById("logo").click()}
                className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-[9px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
              >
                Agregar
              </button>
              <span id="file-name" className="ml-2 text-gray-700 dark:text-gray-300 truncate max-w-xs"></span>
            </div>
          </div>

          {/* Botón de Registrar */}
          <div className="col-span-1 md:col-span-2 flex items-center justify-center mt-4">
            <button
              type="submit"
              className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
