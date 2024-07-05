import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen bg-principalAzul p-4 flex flex-col items-center relative">
      {/* Encabezado */}
      <header className="w-full bg-principalAzulTono5 py-4 absolute top-0 left-0 right-0">
        <div className="container mx-auto px-4 flex justify-start">
          <h1 className="text-white text-xl md:text-2xl font-nunito">
            Payroll System
          </h1>
        </div>
      </header>

      {/* Contenido del formulario de inicio de sesión */}
      <div className="flex items-center justify-center flex-grow w-full max-w-md relative z-10 md:mt-24">
        {/* Cuadro azul oscuro detrás del formulario */}
        <div className="absolute bg-principalAzulTono5 rounded-lg w-full h-80 transform translate-x-10 translate-y-11 -z-10 opacity-45"></div>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-6">Iniciar Sesión</h2>
          <form>
            {/* Campo Username */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-md font-medium font-roboto-serif mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border-transparent rounded w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-md font-medium font-roboto-serif mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border-transparent rounded w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
              />
            </div>

            {/* Botón de Entrar */}
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;