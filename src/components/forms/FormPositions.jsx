import React, { useState } from 'react';

const FormPositions = ({ position, onSubmit }) => {
  const [values, setValues] = useState({
    name: position ? position.nombre : '',
    description: position ? position.descripcion : '',
    salary: position ? position.salarioBase : '',
    hourlyRate: position ? position.horasDiarias : '',
    daysOfWork: position ? position.diasTrabajo : [],
    period: position ? position.periodo : '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const day = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setValues(prevState => ({
        ...prevState,
        daysOfWork: [...prevState.daysOfWork, day],
      }));
    } else {
      setValues(prevState => ({
        ...prevState,
        daysOfWork: prevState.daysOfWork.filter(item => item !== day),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-11/12 focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Descripción
        </label>
        <input
          id="description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="salary" className="block text-sm font-medium mb-2">
          Salario Base
        </label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={values.salary}
          onChange={handleInputChange}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-11/12 focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="hourlyRate" className="block text-sm font-medium mb-2">
          Horas Diarias
        </label>
        <input
          type="number"
          id="hourlyRate"
          name="hourlyRate"
          value={values.hourlyRate}
          onChange={handleInputChange}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label htmlFor="period" className="block text-sm font-medium mb-2">
          Periodo de pago
        </label>
        <select
          id="period"
          name="period"
          value={values.period}
          onChange={handleInputChange}
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-11/12 focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccionar periodo</option>
          <option value="Diario">Diario</option>
          <option value="Semanal">Semanal</option>
          <option value="Mensual">Mensual</option>
          <option value="Anual">Anual</option>
        </select>
      </div>

      <div className="mb-4 col-span-2">
        <h2 className="text-sm font-semibold mb-4">Días de trabajo:</h2>
        <div className="flex flex-wrap gap-2 ml-8">
          <CheckboxDay label="Lunes" value="Lunes" checked={values.daysOfWork.includes('Lunes')} onChange={handleCheckboxChange} />
          <CheckboxDay label="Martes" value="Martes" checked={values.daysOfWork.includes('Martes')} onChange={handleCheckboxChange} />
          <CheckboxDay label="Miércoles" value="Miércoles" checked={values.daysOfWork.includes('Miércoles')} onChange={handleCheckboxChange} />
          <CheckboxDay label="Jueves" value="Jueves" checked={values.daysOfWork.includes('Jueves')} onChange={handleCheckboxChange} />
        </div>
        <div className="flex flex-wrap gap-2 mt-4 ml-8 md:flex-row">
          <CheckboxDay label="Viernes" value="Viernes" checked={values.daysOfWork.includes('Viernes')} onChange={handleCheckboxChange} />
          <CheckboxDay label="Sábado" value="Sábado" checked={values.daysOfWork.includes('Sábado')} onChange={handleCheckboxChange} />
          <CheckboxDay label="Domingo" value="Domingo" checked={values.daysOfWork.includes('Domingo')} onChange={handleCheckboxChange} />
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

const CheckboxDay = ({ label, value, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor={value} className="font-medium mr-2">{label}</label>
      <input
        type="checkbox"
        id={value}
        name={value}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-checkbox text-black h-5 w-5"
      />
    </div>
  );
};

export default FormPositions;
