import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen bg-principalAzul p-4 flex flex-col items-center relative">
      <header className="w-full bg-principalAzulTono5 py-4 absolute top-0 left-0 right-0">
        <div className="container mx-auto px-4 flex justify-start">
          <h1 className="text-white text-xl md:text-2xl font-nunito">
            Payroll System
          </h1>
        </div>
      </header>
      <div className="flex items-center justify-center flex-grow w-full max-w-md relative z-10 md:mt-24">
        <div className="absolute bg-principalAzulTono5 rounded-lg w-11/12 h-3/4 transform translate-x-11 translate-y-8 sm: h-2/3 transform translate-x-11 translate-y-11 -z-10  opacity-45"></div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold font-nunito mb-6 text-left">
            Registro
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-md font-medium font-roboto-serif mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border-transparent rounded w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-md font-medium font-roboto-serif mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border-transparent rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-md font-medium font-roboto-serif mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border-transparent rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-md font-medium font-roboto-serif mb-2"
                htmlFor="confirmPassword"
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border-transparent rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
