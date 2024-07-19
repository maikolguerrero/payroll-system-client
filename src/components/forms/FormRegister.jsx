import React, { useContext, useState } from 'react';
import formValidation from '../../validations/formValidation';
import { Contexto } from '../../context/Contexto';
import { useNavigate } from 'react-router-dom';
import paths from '../../config/routePaths';
import { alertInfo } from '../alerts/alerts';

export default function FormRegister() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "admin_principal"
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
    const validatePasswords = formValidation.validatePasswords(values.password, values.confirmPassword)

    // Asignar mensajes si se llena mal el campo
    if (!validateName) return alertInfo('Por favor ingrese su nombre.')
    if (!validateUsername) return alertInfo('Por favor ingrese un Usuario.')
    if (!validatePassword) return alertInfo('incluir una mayúscula y un número. 6 caracteres min.')
    if (!validatePasswords) return alertInfo('Las contraseñas no coinciden.')

    const respuesta = await peticionPost("http://localhost:3000/api/users/register", "POST", values)
    if (respuesta.message === "Usuario creado exitosamente") {
      alert(respuesta.message);
      return navigate(paths.LOGIN_PATH);
    } else {
      alert("Exisito un error revisa la consola");
      return setValues({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "admin_principal"
      })
    }
  };

  return (
    <div className="flex items-center justify-center flex-grow w-full max-w-md relative mt-24 sm:mt-32 md:mt-24">
      <div className="bg-white p-8 rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-lg">
        <h2 className="text-2xl font-semibold font-nunito mb-6 text-left">
          Registro
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-md font-medium font-roboto-serif mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name='name'
              value={values.name}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
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
              name='username'
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
              name='password'
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
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline leading-tight w-32"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}



