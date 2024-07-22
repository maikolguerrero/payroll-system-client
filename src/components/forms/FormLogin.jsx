import React, { useContext, useState } from 'react';
import paths from '../../config/routePaths';
import formValidation from '../../validations/formValidation';
import { Contexto } from '../../context/Contexto';
import { useNavigate } from 'react-router-dom';
import { alertBasic, alertError, alertInfo } from '../alerts/alerts';

export default function FormLogin() {
  const { peticionPost, setToken, setUser } = useContext(Contexto);
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

    if (!validateUsername) return alertInfo('Por favor ingrese un Usuario.');
    if (!validatePassword) return alertInfo('Por favor ingrese su Contraseña.');

    const respuesta = await peticionPost("http://localhost:3000/api/users/login", "POST", values);
    if (respuesta.token) {
      setToken(respuesta.token);
      setUser(respuesta.result);
      alertBasic("Inicio de Sesión Exitoso");
      return navigate(paths.DASHBOARD_PATH);
    } else {
      alertError("Datos Erroneos para Iniciar Sesión");
      return setValues({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center flex-grow w-full relative">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] dark:drop-shadow-[25px_40px_rgba(0,0,0,0.25)] w-full max-w-md 2xl:max-w-lg xs:mx-6 xl:mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-md font-medium mb-2 text-gray-900 dark:text-gray-200"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name='username'
              value={values.username}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 bg-gray-300 dark:bg-gray-700"
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-md font-medium mb-2 text-gray-900 dark:text-gray-200"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 dark:text-gray-200 bg-gray-300 dark:bg-gray-700"
            />
          </div>

          {/* Botón de Entrar */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-principalAzulTono5 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
