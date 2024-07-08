import React from 'react';

const FormDepartments = ({ department }) => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Campo Nombre */}
      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            defaultValue={department ? department.name : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Campo Descripción */}
      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            defaultValue={department ? department.description : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Campo Ubicación */}
      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            defaultValue={department ? department.location : ''}
            className="leading-tight shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Botón de Registrar */}
      <div className="col-span-2 flex items-center justify-center mt-4">
        <button
          type="submit"
          className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-32"
        >
          {department ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
};

export default FormDepartments;
