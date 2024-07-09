import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import { format } from 'date-fns';

export default function FormAttendance({ employees }) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    setDate(formattedDate);
  }, []);

  return (
    <form className="space-y-4">
      {/* Campo Empleado y Buscador */}
      <div className="mb-4">
        <label htmlFor="employee" className="block text-md font-medium mb-2">
          Empleado
        </label>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <div className="w-full md:flex-1">
            <select
              id="employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full"
            >
              <option value="">Seleccionar empleado</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.ci} - {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:flex-1 mt-4 md:mt-0">
            <SearchBar placeholder="Buscar empleado..." onSearch={(query) => { }} />
          </div>
        </div>
      </div>

      {/* Campo Fecha */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-md font-medium mb-2">
          Fecha
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 w-full text-gray-800 leading-tight bg-gray-300"
        />
      </div>

      {/* Campos Hora Ingreso y Hora Salida */}
      <div className="mb-4 flex items-center space-x-4">
        <div className="w-full">
          <label htmlFor="entry-time" className="block text-md font-medium mb-2">
            Hora de Ingreso
          </label>
          <input
            type="time"
            id="entry-time"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            className="shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 w-full text-gray-800 leading-tight bg-gray-300"
          />
        </div>
        <div className="w-full">
          <label htmlFor="exit-time" className="block text-md font-medium mb-2">
            Hora de Salida
          </label>
          <input
            type="time"
            id="exit-time"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
            className="shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 w-full text-gray-800 leading-tight bg-gray-300"
          />
        </div>
      </div>

      {/* Botón de Guardar */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline leading-tight"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}