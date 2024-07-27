import React, { useContext, useState } from "react";
import formValidation from "../../validations/formValidation";
import { Contexto } from "../../context/Contexto";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";

export default function FormUser({user, submit, onClose}) {
  const { peticionPost, users, setUsers } = useContext(Contexto)

  const [values, setValues] = useState({
    name: user ? user.name : '',
    username: user ? user.username : '',
    password: '',
    confirmPassword: '',
    role: user ? user.role : "admin_nomina"
  });

  const handleUpdate = (update) => {
    let array = users
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === update._id) {
        array[i] = update
      }
    }
    console.log(array)
    setUsers(array)
  }

  const handleCreate = (create) => {
    let array = users
    array.push(create);
    setUsers(array)
  }

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
    const validatePasswords = formValidation.validatePasswords(values.password, values.confirmPassword)

    // Asignar mensajes si se llena mal el campo
    if (!validateName) return alertInfo('Por favor ingrese su nombre.')
    if (!validateUsername) return alertInfo('Por favor ingrese un Usuario.')
    if (!validatePassword) return alertInfo('incluir una mayúscula y un número. 6 caracteres min.')
    if (!validatePasswords) return alertInfo('Las contraseñas no coinciden.')

    if (user) {
      const respuesta = await peticionPost(`http://localhost:3000/api/users/${user._id}`, "PUT", values)
      if (respuesta.message === "Usuario actualizado exitosamente") {
        alertConfirm(respuesta.message);
        handleUpdate(respuesta.user)
        onClose()
        return 
      } else {
        alert("Existe un error revisa la consola");
        return setValues({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          role: "admin_nomina"
        })
      }
    } else {
      const respuesta = await peticionPost("http://localhost:3000/api/users/register", "POST", values)
      if (respuesta.message === "Usuario creado exitosamente") {
        alertConfirm(respuesta.message);
        handleCreate(respuesta.user)
        onClose()
        return 
      } else {
        alertError("Existe un error revisa la consola")
        console.log(respuesta)
        return setValues({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          role: "admin_nomina"
        })
      }
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-md font-medium mb-2">
            Nombre y Apellido
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

        <div className="mb-4">
          <label
            className="block text-md font-medium font-roboto-serif mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-md font-medium font-roboto-serif mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-md font-medium font-roboto-serif mb-2"
            htmlFor="confirmPassword"
          >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
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
