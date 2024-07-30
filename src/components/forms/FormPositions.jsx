import React, { useState, useEffect, useContext } from "react";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";
import formValidation from "../../validations/formValidation";
import { Contexto } from "../../context/Contexto";

// Mapeo de abreviaciones a nombres completos
const dayMap = {
  Lun: "Lunes",
  Mar: "Martes",
  Mié: "Miércoles",
  Jue: "Jueves",
  Vie: "Viernes",
  Sáb: "Sábado",
  Dom: "Domingo",
};

// Función para convertir un string de abreviaciones en un array de nombres completos
const convertStringToFullNamesArray = (abbreviationsString) => {
  // Divide el string en un array de abreviaciones, eliminando espacios adicionales
  const abbreviationsArray = abbreviationsString.split(',').map(abbr => abbr.trim());
  // Convierte las abreviaciones a nombres completos usando el mapeo
  return abbreviationsArray.map(abbr => dayMap[abbr] || abbr);
};

// Días completos de la semana
const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

// Componente del formulario para la posición
const FormPositions = ({ position, onSubmit, onClose }) => {
  const { peticionPost } = useContext(Contexto)

  const [values, setValues] = useState({
    name: position ? position.name : "",
    description: position ? position.description : "",
    base_salary: position ? position.base_salary : "",
    daily_hours: position ? position.daily_hours : "",
    // work_days: Array.isArray(position?.work_days) ? position.work_days : [],
    work_days: position ? (position.work_days) ? convertStringToFullNamesArray(position.work_days) : [] : [],
    period: position ? position.period : "",
  });

  // Cargar los valores iniciales si hay una posición proporcionada
  // useEffect(() => {
  //   if (position) {
  //     setValues({
  //       name: position.name || "",
  //       description: position.description || "",
  //       base_salary: position.base_salary || "",
  //       daily_hours: position.daily_hours || "",
  //       work_days: position ? (position.work_days) ? position.work_days : [] : [],
  //       period: position.period || "",
  //     });
  //   }
  // }, [position]);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      handleCheckboxChange(value, checked);
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  // Manejar el cambio de los días de trabajo seleccionados
  const handleCheckboxChange = (value, checked) => {
    setValues((prevValues) => ({
      ...prevValues,
      work_days: checked
        ? [...prevValues.work_days, value]
        : prevValues.work_days.filter((day) => day !== value),
    }));
  };

  // Manejar la validación y el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateName = formValidation.validateText(values.name);
    const validateDescription = formValidation.validateText(values.description);
    const validateSalario = formValidation.validateText(values.base_salary.toString());
    const validateHours = formValidation.validateText(values.daily_hours.toString());
    const validatePeriod = formValidation.validateText(values.period);

    // Asignar mensajes si se llena mal el campo
    if (!validateName) return alertInfo("Por favor ingrese el nombre.");
    if (!validateDescription) return alertInfo("Por favor ingrese la descripcion.");
    if (!validateSalario) return alertInfo("Por favor ingrese el salario base.");
    if (!validateHours) return alertInfo("Por favor ingrese las horas diarias.");
    if (!validatePeriod) return alertInfo("Por favor ingrese el periodo.");

    let respuesta;

    if (position) {
      respuesta = await peticionPost(
        `http://localhost:3000/api/positions/${position._id}`,
        "PUT",
        values
      );
    } else {
      respuesta = await peticionPost(
        "http://localhost:3000/api/positions",
        "POST",
        values
      );
    }

    if (respuesta.message === "Puesto actualizado exitosamente" || respuesta.message === "Puesto creado exitosamente") {
      alertConfirm(respuesta.message);
      onSubmit();
      onClose();
    } else {
      alertError(respuesta.error);
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
      onSubmit={handleSubmit}
    >
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
        <label htmlFor="base_salary" className="block text-sm font-medium mb-2">
          Salario Base
        </label>
        <input
          type="number"
          id="base_salary"
          name="base_salary"
          value={values.base_salary}
          onChange={handleInputChange}
          min="1"
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-11/12 focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="daily_hours" className="block text-sm font-medium mb-2">
          Horas Diarias
        </label>
        <input
          type="number"
          id="daily_hours"
          name="daily_hours"
          value={values.daily_hours}
          onChange={handleInputChange}
          min="1"
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
          required
          className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-11/12 focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Seleccionar periodo
          </option>
          <option value="Diario">Diario</option>
          <option value="Semanal">Semanal</option>
          <option value="Mensual">Mensual</option>
          <option value="Anual">Anual</option>
        </select>
      </div>

      <div className="mb-4 col-span-2">
        <h2 className="text-sm font-semibold mb-4">Días de trabajo:</h2>
        <div className="flex flex-wrap gap-2 ml-8">
          {daysOfWeek.slice(0, 4).map((day) => (
            <CheckboxDay
              key={day}
              label={day}
              value={day}
              checked={values.work_days.includes(day)}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4 ml-8 md:flex-row">
          {daysOfWeek.slice(4).map((day) => (
            <CheckboxDay
              key={day}
              label={day}
              value={day}
              checked={values.work_days.includes(day)}
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
          {position ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
};

// Componente para los checkboxes de los días de trabajo
const CheckboxDay = ({ label, value, checked, onChange }) => (
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-4 w-4 text-principalAzulTono5 focus:ring-principalAzulTono5"
    />
    {label}
  </label>
);

export default FormPositions;