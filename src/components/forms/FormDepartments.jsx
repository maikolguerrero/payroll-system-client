import React, { useContext, useState } from "react";
import formValidation from "../../validations/formValidation";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";
import { Contexto } from "../../context/Contexto";

const FormDepartments = ({ department, onClose, onSubmit }) => {
  const { peticionPost } = useContext(Contexto);

  const [values, setValues] = useState({
    name: department ? department.name : "",
    description: department ? department.description : "",
    location: department ? department.location : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateName = formValidation.validateText(values.name);
    const validateDescription = formValidation.validateText(values.description);
    const validateLocation = formValidation.validateText(values.location);

    // Asignar mensajes si se llena mal el campo
    if (!validateName)
      return alertInfo("Por favor ingrese el nombre del Departamento.");
    if (!validateDescription)
      return alertInfo("Por favor ingrese la descripcion del Departamento.");
    if (!validateLocation)
      return alertInfo("Por favor ingrese la ubicacion del Departamento.");

    let respuesta;

    if (department) {
      respuesta = await peticionPost(
        `http://localhost:3000/api/departments/${department._id}`,
        "PUT",
        values
      );
    } else {
      respuesta = await peticionPost(
        "http://localhost:3000/api/departments",
        "POST",
        values
      );
    }

    if (respuesta.message === "Departamento actualizado exitosamente" || respuesta.message === "Departamento creado exitosamente") {
      alertConfirm(respuesta.message);
      onSubmit();
      onClose();
    } else {
      alertError("Ocurrió un error. Revisa la consola.");
      console.log(respuesta);
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={handleSubmit}
    >
      {/* Campo Nombre */}
      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
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
            name="location"
            value={values.location}
            onChange={handleInputChange}
            className="leading-tight shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Campo Descripción */}
      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Botón de Registrar */}
      <div className="col-span-2 flex items-center justify-center mt-4">
        <button
          type="submit"
          className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-32"
        >
          {department ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
};

export default FormDepartments;
