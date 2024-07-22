import React, { useContext, useState } from "react";
import formValidation from "../../validations/formValidation";
import { Contexto } from "../../context/Contexto";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";

export default function FormUser({ user, submit, onClose }) {
  const { peticionPost } = useContext(Contexto);

  const [values, setValues] = useState({
    name: user ? user.name : '',
    username: user ? user.username : '',
    password: '',
    confirmPassword: '',
    role: user ? user.role : "admin_nomina"
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
    const validateUsername = formValidation.validateText(values.username);
    const validatePassword = formValidation.validatePassword(values.password);
    const validatePasswords = formValidation.validatePasswords(values.password, values.confirmPassword);

    // Asignar mensajes si se llena mal el campo
    if (!validateName) return alertInfo('Por favor ingrese su nombre.');
    if (!validateUsername) return alertInfo('Por favor ingrese un Usuario.');
    if (!validatePassword) return alertInfo('Incluir una mayúscula y un número. 6 caracteres min.');
    if (!validatePasswords) return alertInfo('Las contraseñas no coinciden.');

    if (user) {
      const respuesta = await peticionPost(`http://localhost:3000/api/users/${user._id}`, "PUT", values);
      if (respuesta.message === "Usuario actualizado exitosamente") {
        alertConfirm(respuesta.message);
        onClose();
        return;
      } else {
        alert("Existió un error, revisa la consola.");
        console.log(respuesta);
        return setValues({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          role: "admin_nomina"
        });
      }
    } else {
      const respuesta = await peticionPost("http://localhost:3000/api/users/register", "POST", values);
      if (respuesta.message === "Usuario creado exitosamente") {
        alertConfirm(respuesta.message);
        onClose();
        return;
      } else {
        alertError("Existió un error, revisa la consola.");
        console.log(respuesta);
        return setValues({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          role: "admin_nomina"
        });
      }
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-3 p-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-md font-roboto-serif font-medium mb-2 text-black dark:text-gray-300">
            Nombre y Apellido
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[9px] py-2 px-4 text-gray-800 dark:text-gray-300 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:shadow-outline w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-md font-medium font-roboto-serif mb-2 text-black dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-300 leading-tight bg-gray-300 dark:bg-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-md font-medium font-roboto-serif mb-2 text-black dark:text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 leading-tight bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-md font-medium font-roboto-serif mb-2 text-black dark:text-gray-300">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleInputChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded-[10px] w-full py-2 px-3 leading-tight bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-1 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-32"
          >
            {submit}
          </button>
        </div>
      </form>
    </>
  );
}
