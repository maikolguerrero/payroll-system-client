import React from 'react';

const FormEmployees = ({ employee }) => {
  return (
      <div className="bg-white dark:bg-gray-800 rounded-[10px] w-full max-w-4xl">

        <form className="grid grid-cols-1 md:grid-cols-2">
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Nombres
              </label>
              <input
                type="text"
                id="firstName"
                defaultValue={employee ? employee.firstName : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Apellidos
              </label>
              <input
                type="text"
                id="lastName"
                defaultValue={employee ? employee.lastName : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="department" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Departamento
              </label>
              <select
                id="department"
                defaultValue={employee ? employee.department : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Selecciona un departamento</option>
                <option value="HR">Recursos Humanos</option>
                <option value="IT">Tecnología de la Información</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="role" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Cargo
              </label>
              <select
                id="role"
                defaultValue={employee ? employee.role : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Selecciona un cargo</option>
                <option value="manager">Gerente</option>
                <option value="developer">Desarrollador</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="baseSalary" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Salario Base
              </label>
              <input
                type="number"
                id="baseSalary"
                defaultValue={employee ? employee.baseSalary : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="address" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Dirección
              </label>
              <input
                type="text"
                id="address"
                defaultValue={employee ? employee.address : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="startDate" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Fecha de Ingreso
              </label>
              <input
                type="date"
                id="startDate"
                defaultValue={employee ? employee.startDate : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="birthDate" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="birthDate"
                defaultValue={employee ? employee.birthDate : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="idNumber" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Cédula de Identidad
              </label>
              <input
                type="text"
                id="idNumber"
                defaultValue={employee ? employee.idNumber : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="gender" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Género
              </label>
              <select
                id="gender"
                defaultValue={employee ? employee.gender : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Selecciona un género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                defaultValue={employee ? employee.email : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                defaultValue={employee ? employee.phone : ''}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          <div className="mb-4"></div>

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="leading-tight bg-principalAzulTono5 dark:bg-blue-600 hover:bg-principalAzulTono4 dark:hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
  );
};

export default FormEmployees;
