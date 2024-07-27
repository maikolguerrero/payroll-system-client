import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../../components/SearchBar';
import { format } from 'date-fns';
import { Contexto } from '../../context/Contexto';
import { alertConfirm, alertError, alertInfo } from '../alerts/alerts';
import formValidation from '../../validations/formValidation';

export default function FormAttendance({ employees, current }) {
  const { peticionPost } = useContext(Contexto);

  const [values, setValues] = useState({
    date: current ? current.date : "",
    employee_id: current ? current.employee_id : "",
    entry_time: current ? current.entry_time : "",
    exit_time: current ? current.exit_time : "",
  });

  useEffect(() => {
    setValues({
      ...values,
      "date": values.date.split("T00:00:00.000Z").join('')
    });
  }, [current]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) return alertInfo(validate);
    
    
    if (current) {
      const respuesta = await peticionPost(
        `http://localhost:3000/api/attendances/${current._id}`,
        "PUT",
        values
      );
      if (respuesta.message) {
        alertConfirm(respuesta.message);
        return onClose();
      } else {
        alert("Existio un error revisa la consola");
        return console.log(respuesta);
      }
    } else {
      const respuesta = await peticionPost(
        "http://localhost:3000/api/attendances",
        "POST",
        values
      );
      if (respuesta.message) {
        alertConfirm(respuesta.message);
        return //onClose();
      } else {
        alertError("Existe un error revisa la consola");
        return console.log(respuesta);
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Campo Empleado y Buscador */}
      <div className="mb-4">
        <label htmlFor="employee_id" className="block text-md font-medium mb-2">
          Empleado
        </label>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <div className="w-full md:flex-1">
            <select
              id="employee_id"
              name='employee_id'
              value={values.employee_id}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full"
            >
              <option value="">Seleccionar empleado</option>
              {employees.map(employee => (
                <option key={employee._id} value={employee._id}>
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
          name='date'
          value={values.date}
          onChange={handleInputChange}
          className="shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 w-full text-gray-800 leading-tight bg-gray-300"
        />
      </div>

      {/* Campos Hora Ingreso y Hora Salida */}
      <div className="mb-4 flex items-center space-x-4">
        <div className="w-full">
          <label htmlFor="entry_time" className="block text-md font-medium mb-2">
            Hora de Ingreso
          </label>
          <input
            type="time"
            id="entry_time"
            name='entry_time'
            value={values.entry_time}
            onChange={handleInputChange}
            className="shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 w-full text-gray-800 leading-tight bg-gray-300"
          />
        </div>
        <div className="w-full">
          <label htmlFor="exit_time" className="block text-md font-medium mb-2">
            Hora de Salida
          </label>
          <input
            type="time"
            id="exit_time"
            value={values.exit_time}
            name='exit_time'
            onChange={handleInputChange}
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