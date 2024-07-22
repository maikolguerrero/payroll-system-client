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

    if (department) {
      const respuesta = await peticionPost(
        `http://localhost:3000/api/departments/${department._id}`,
        "PUT",
        values
      );
      if (respuesta.message === "Departamento actualizado exitosamente") {
        alertConfirm(respuesta.message);
        return onClose();
      } else {
        alert("Existió un error, revisa la consola");
        return setValues({
          name: "",
          description: "",
          location: "",
        });
      }
    } else {
      const respuesta = await peticionPost(
        "http://localhost:3000/api/departments",
        "POST",
        values
      );
      if (respuesta.message === "Departamento creado exitosamente") {
        alertConfirm(respuesta.message);
        return onClose();
      } else {
        alertError("Existe un error, revisa la consola");
        console.log(respuesta);
        return setValues({
          name: "",
          description: "",
          location: "",
        });
      }
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      {/* Campo Nombre */}
      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            className="shadow appearance-none border border-transparent rounded-[9px] py-2 px-4 text-gray-800 dark:text-gray-200 w-full leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Campo Ubicación */}
      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="location" className="block text-sm font-medium mb-2 text-gray-900 w-full dark:text-gray-200">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={values.location}
            onChange={handleInputChange}
            className="leading-tight shadow appearance-none border border-transparent rounded-[9px] py-2 px-4 text-gray-800 w-full dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Campo Descripción */}
      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200"
          >
            Descripción
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            className="shadow appearance-none border border-transparent rounded-[9px] py-2 px-4 w-full text-gray-800 dark:text-gray-200 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:shadow-outline"
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
