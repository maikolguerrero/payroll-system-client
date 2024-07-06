import React from "react";

const CompanyRegister = () => {
  return (
    <div className="min-h-screen bg-principalAzul p-4 flex flex-col items-center relative">
      {/* Encabezado */}
      <header className="w-full bg-principalAzulTono5 py-4 absolute top-0">
        <div className="container mx-auto px-4 flex justify-start">
          <h1 className="text-white text-xl md:text-2xl font-nunito">
            Payroll System
          </h1>
        </div>
      </header>

      {/* Contenido del formulario de registro de empresa */}
      <div className="flex items-center justify-center flex-grow w-full max-w-4xl relative mt-24 sm:mt-32 md:mt-24">
        <div className="bg-white p-8 rounded-[28px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Registro de la empresa
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo Nombre */}
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
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 mobile:w-full sm:w-full md:w-10/12"
              />
            </div>

            {/* Campo Dirección */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-md font-medium font-roboto-serif mb-2"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 mobile:w-full sm:w-full md:w-10/12"
              />
            </div>

            {/* Campo País */}
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-md font-medium font-roboto-serif mb-2"
              >
                País
              </label>
              <input
                type="text"
                id="country"
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 mobile:w-full sm:w-full md:w-10/12"
              />
            </div>

            {/* Campo Moneda */}
            <div className="mb-4">
              <label
                htmlFor="currency"
                className="block text-md font-medium font-roboto-serif mb-2"
              >
                Moneda
              </label>
              <input
                type="text"
                id="currency"
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 mobile:w-full sm:w-full md:w-10/12"
              />
            </div>

            {/* Campo Fecha de Fundación */}
            <div className="mb-4">
              <label
                htmlFor="foundationDate"
                className="block text-md font-medium font-roboto-serif mb-2"
              >
                Fecha de Fundación
              </label>
              <input
                type="date"
                id="foundationDate"
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 mobile:w-1/1 sm:w-1/2"
              />
            </div>

            {/* Campo Logo (Opcional) */}
            <div className="mb-4">
              <label
                htmlFor="logo"
                className="block text-md font-medium font-roboto-serif mb-2"
              >
                Logo (Opcional)
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="logo"
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
                  className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-[9px] focus:outline-none focus:shadow-outline w-48"
                >
                  Agregar
                </button>
                <span id="file-name" className="ml-4 text-gray-700"></span>
              </div>
            </div>

            {/* Botón de Registrar */}
            <div className="col-span-1 md:col-span-2 flex items-center justify-center mt-4">
              <button
                type="submit"
                className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-40"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;
