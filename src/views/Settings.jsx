import React from 'react';

const Settings = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Configuración del Sistema</h2>

        {/* Formulario de Configuración */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo Formato de Fecha */}
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="dateFormat" className="block text-sm font-medium mb-2">
                Formato de Fecha
              </label>
              <select
                id="dateFormat"
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
              >
                <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                {/* Agregar más opciones según sea necesario */}
              </select>
            </div>
          </div>

          {/* Campo Tema */}
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="theme" className="block text-sm font-medium mb-2">
                Tema
              </label>
              <select
                id="theme"
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
                {/* Agregar más opciones según sea necesario */}
              </select>
            </div>
          </div>

          {/* Campo Idioma */}
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="language" className="block text-sm font-medium mb-2">
                Idioma
              </label>
              <select
                id="language"
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
              >
                <option value="english">Inglés</option>
                <option value="spanish">Español</option>
                {/* Agregar más opciones según sea necesario */}
              </select>
            </div>
          </div>

          {/* Campo Zona Horaria */}
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="timezone" className="block text-sm font-medium mb-2">
                Zona Horaria
              </label>
              <input
                type="text"
                id="timezone"
                className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Espacio entre inputs y botones */}
          <div className="mb-8 md:mb-12"></div>

          {/* Botones Cancelar y Guardar Cambios */}
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={() => console.log('Cancelar')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-[9px] focus:outline-none focus:shadow-outline mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={() => console.log('Guardar cambios')}
              className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-[9px] focus:outline-none focus:shadow-outline"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
