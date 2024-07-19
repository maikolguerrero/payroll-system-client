import React, { useContext, useState } from 'react';
import paths from '../../config/routePaths';
import formValidation from '../../validations/formValidation';
import { Contexto } from '../../context/Contexto';
import { useNavigate } from 'react-router-dom';

export default function FormLogin() {
  const { peticionPost, setToken, setUser } = useContext(Contexto)

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: ""
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
    const validateUsername = formValidation.validateText(values.username);
    const validatePassword = formValidation.validateText(values.password);

    // Asignar mensajes si se llena mal el campo
    if (!validatePassword) alert('Por favor ingrese su Contraseña.')
    if (!validateUsername) alert('Por favor ingrese un Usuario.')

    const respuesta = await peticionPost("http://localhost:3000/api/users/login", "POST", values)
    if (!respuesta.error) {
      setToken(respuesta.token);
      setUser(respuesta.result);
      return navigate(paths.DASHBOARD_PATH);
    } else {
      alert("Error en el Inicio de Sesion (verifique sus datos)");
      return setValues({
        username: "",
        password: "",
      })
    }
  };

  return (
    <div className="flex items-center justify-center flex-grow w-full max-w-md relative md:mt-24">
      <div className="bg-white p-8 rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name='username'
              value={values.name}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>

          {/* Botón de Entrar */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline leading-tight w-24"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}