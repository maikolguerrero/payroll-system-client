import React, { useState, useEffect } from "react";

// Días completos de la semana
const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Componente del formulario para la posición
const FormPositions = ({ position, onSubmit }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    salary: '',
    hourlyRate: '',
    daysOfWork: [],
    period: '',
  });

  // Cargar los valores iniciales si hay una posición proporcionada
  useEffect(() => {
    if (position) {
      setValues({
        name: position.nombre || '',
        description: position.descripcion || '',
        salary: position.salarioBase || '',
        hourlyRate: position.horasDiarias || '',
        daysOfWork: Array.isArray(position.diasTrabajo) ? position.diasTrabajo : [],
        period: position.periodo || '',
      });
    } else {
      setValues({
        name: '',
        description: '',
        salary: '',
        hourlyRate: '',
        daysOfWork: [],
        period: '',
      });
    }
  }, [position]);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setValues(prevValues => ({
        ...prevValues,
        daysOfWork: checked
          ? [...prevValues.daysOfWork, value]
          : prevValues.daysOfWork.filter(day => day !== value),
      }));
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  // Manejar la validación y el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre: values.name,
      descripcion: values.description,
      salarioBase: values.salary,
      horasDiarias: values.hourlyRate,
      diasTrabajo: values.daysOfWork,
      periodo: values.period,
    });
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-white dark:bg-gray-800" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          className="shadow appearance-none border border-transparent rounded-[9px] py-2 px-4 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
          Descripción
        </label>
        <input
          id="description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          className="shadow appearance-none border border-transparent rounded-[9px] py-2 px-4 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="salary" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
          Salario Base
        </label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={values.salary}
          onChange={handleInputChange}
          min="1"
          className="shadow appearance-none border border-transparent rounded-[9px] py-2 px-4 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="hourlyRate" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
          Horas Diarias
        </label>
        <input
          type="number"
          id="hourlyRate"
          name="hourlyRate"
          value={values.hourlyRate}
          onChange={handleInputChange}
          min="1"
          className="shadow appearance-none border border-transparent rounded-[9px] py-2 px-4 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label htmlFor="period" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
          Periodo de pago
        </label>
        <select
          id="period"
          name="period"
          value={values.period}
          onChange={handleInputChange}
          required
          className="shadow appearance-none border border-transparent rounded-[9px] py-2 px-4 text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 w-full focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>Seleccionar periodo</option>
          <option value="Diario">Diario</option>
          <option value="Semanal">Semanal</option>
          <option value="Mensual">Mensual</option>
          <option value="Anual">Anual</option>
        </select>
      </div>

      <div className="mb-4 col-span-2">
        <h2 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-200">Días de trabajo:</h2>
        <div className="flex flex-wrap gap-2 ml-8">
          {daysOfWeek.slice(0, 4).map(day => (
            <CheckboxDay
              key={day}
              label={day}
              value={day}
              checked={values.daysOfWork.includes(day)}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4 ml-8 md:flex-row">
          {daysOfWeek.slice(4).map(day => (
            <CheckboxDay
              key={day}
              label={day}
              value={day}
              checked={values.daysOfWork.includes(day)}
              onChange={handleInputChange}
            />
          ))}
        </div>
      </div>

      <div className="col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-1 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-32"
        >
          {position ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
};

// Componente para los checkboxes de los días de trabajo
const CheckboxDay = ({ label, value, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor={value} className="font-medium mr-2 text-gray-900 dark:text-gray-200">{label}</label>
      <input
        type="checkbox"
        id={value}
        name="daysOfWork"
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-principalAzulTono4 dark:text-principalAzulTono4"
      />
    </div>
  );
};

export default FormPositions;
