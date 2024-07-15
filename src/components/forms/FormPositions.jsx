import React from 'react';

const FormPositions = ({ position }) => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          defaultValue={position ? position.name : ''}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          defaultValue={position ? position.description : ''}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full h-24 focus:outline-none focus:shadow-outline resize-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="salary" className="block text-sm font-medium mb-2">
          Salario Base
        </label>
        <input
          type="number"
          id="salary"
          defaultValue={position ? position.salary : ''}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="hourlyRate" className="block text-sm font-medium mb-2">
          Horas Diarias
        </label>
        <input
          type="number"
          id="hourlyRate"
          defaultValue={position ? position.hourlyRate : ''}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold mb-2">Días de trabajo:</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center">
            <label htmlFor="monday" className="font-medium">Lunes</label>
            <input type="checkbox" id="monday" className="form-checkbox text-principalAzulTono5 h-5 w-5 ml-2" />
          </div>
          <div className="flex items-center">
            <label htmlFor="tuesday" className="font-medium">Martes</label>
            <input type="checkbox" id="tuesday" className="form-checkbox text-principalAzulTono5 h-5 w-5 ml-2" />
          </div>
          <div className="flex items-center">
            <label htmlFor="wednesday" className="font-medium">Miércoles</label>
            <input type="checkbox" id="wednesday" className="form-checkbox text-principalAzulTono5 h-5 w-5 ml-2" />
          </div>
          <div className="flex items-center">
            <label htmlFor="thursday" className="font-medium">Jueves</label>
            <input type="checkbox" id="thursday" className="form-checkbox text-principalAzulTono5 h-5 w-5 ml-2" />
          </div>
          <div className="flex items-center">
            <label htmlFor="friday" className="font-medium">Viernes</label>
            <input type="checkbox" id="friday" className="form-checkbox text-principalAzulTono5 h-5 w-5 ml-2" />
          </div>
          <div className="flex items-center">
            <label htmlFor="saturday" className="font-medium">Sábado</label>
            <input type="checkbox" id="saturday" className="form-checkbox text-principalAzulTono5 h-5 w-5 ml-2" />
          </div>
          <div className="flex items-center">
            <label htmlFor="sunday" className="font-medium">Domingo</label>
            <input type="checkbox" id="sunday" className="form-checkbox text-principalAzulTono5 h-5 w-5 ml-2" />
          </div>
        </div>
      </div>

      <div className="col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-32 mr-4"
        >
          {position ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
};

export default FormPositions;
