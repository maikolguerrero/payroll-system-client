import React from 'react';

export default function FormRegister() {
  return (
    <div className="flex items-center justify-center flex-grow w-full max-w-md relative mt-24 sm:mt-32 md:mt-24">
      <div className="bg-white p-8 rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-lg">
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
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
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
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
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
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
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
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline leading-tight w-32"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}



