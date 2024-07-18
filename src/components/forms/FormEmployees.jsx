import React from 'react';

const FormEmployees = ({ employee }) => {
  return (
    <form className="grid md:grid-cols-2 justify-center">
      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            Nombres
          </label>
          <input
            type="text"
            id="firstName"
            defaultValue={employee ? employee.firstName : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Apellidos
          </label>
          <input
            type="text"
            id="lastName"
            defaultValue={employee ? employee.lastName : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="department" className="block text-sm font-medium mb-2">
            Departamento
          </label>
          <select
            id="department"
            defaultValue={employee ? employee.department : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un departamento</option>
            <option value="HR">Recursos Humanos</option>
            <option value="IT">Tecnología de la Información</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Cargo
          </label>
          <select
            id="role"
            defaultValue={employee ? employee.role : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un cargo</option>
            <option value="manager">Gerente</option>
            <option value="developer">Desarrollador</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="baseSalary" className="block text-sm font-medium mb-2">
            Salario Base
          </label>
          <input
            type="number"
            id="baseSalary"
            defaultValue={employee ? employee.baseSalary : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            defaultValue={employee ? employee.address : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Fecha de Ingreso
          </label>
          <input
            type="date"
            id="startDate"
            defaultValue={employee ? employee.startDate : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="birthDate" className="block text-sm font-medium mb-2">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="birthDate"
            defaultValue={employee ? employee.birthDate : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="idNumber" className="block text-sm font-medium mb-2">
            Cédula de Identidad
          </label>
          <input
            type="text"
            id="idNumber"
            defaultValue={employee ? employee.idNumber : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="gender" className="block text-sm font-medium mb-2">
            Género
          </label>
          <select
            id="gender"
            defaultValue={employee ? employee.gender : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            defaultValue={employee ? employee.email : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Teléfono
          </label>
          <input
            type="text"
            id="phone"
            defaultValue={employee ? employee.phone : ''}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center mt-4">
        <button
          type="submit"
          className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-32"
        >
          {employee ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
};

export default FormEmployees;
