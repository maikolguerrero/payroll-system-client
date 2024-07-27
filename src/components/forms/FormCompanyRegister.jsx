import React, { useContext, useState } from 'react';
import formValidation from '../../validations/formValidation';
import { alertConfirm, alertError, alertInfo } from '../alerts/alerts';
import { Contexto } from '../../context/Contexto';
import { useNavigate } from 'react-router-dom';
import paths from '../../config/routePaths';

export default function FormCompanyRegister() {
  const {peticionPost} = useContext(Contexto)

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    address: "",
    country: "",
    currency: "",
    foundation_date: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "Completa todos los datos";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) return alertInfo(validate);

    const respuesta = await peticionPost(
      "http://localhost:3000/api/company",
      "POST",
      values
    );
    if (respuesta.message) {
      alertConfirm(respuesta.message);
      /*onSubmit()*/
      return navigate(paths.DASHBOARD_PATH);
    } else {
      alertError("Existe un error revisa la consola");
      return console.log(respuesta);
    }
  };


  return (
    <div className="flex items-center justify-center flex-grow w-full relative">
      <div className="bg-white p-8 xs:p-4 rounded-[28px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-4xl xs:max-h-xl mt-8 xs:mx-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registro de la empresa
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full md:w-10/12"
            />
          </div>

          {/* Campo Dirección */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300  w-full md:w-10/12"
            />
          </div>

          {/* Campo País */}
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              País
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={values.country}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300  w-full md:w-10/12"
            />
          </div>

          {/* Campo Moneda */}
          <div className="mb-4 ">
            <label
              htmlFor="currency"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Moneda
            </label>
            <input
              type="text"
              id="currency"
              name="currency"
              value={values.currency}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 w-full md:w-10/12"
            />
          </div>

          {/* Campo Fecha de Fundación */}
          <div className="mb-4">
            <label
              htmlFor="foundation_date"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha de Fundación
            </label>
            <input
              type="date"
              id="foundation_date"
              name="foundation_date"
              value={values.foundation_date}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-3 text-gray-800 leading-tight bg-gray-300 mobile:w-1/1 sm:w-1/2"
            />
          </div>

          {/* Campo Logo (Opcional)
          <div className="mb-4">
            <label
              htmlFor="logo"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Logo (Opcional)
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="logo"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const fileName =
                    e.target.files.length > 0 ? e.target.files[0].name : "";
                  document.getElementById("file-name").innerText = fileName;
                }}
              />
              <button
                type="button"
                onClick={() => document.getElementById("logo").click()}
                className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-[9px] focus:outline-none focus:shadow-outline w-48"
              >
                Agregar
              </button>
              <span id="file-name" className="ml-2 text-gray-700 truncate max-w-xs"></span>

            </div>
          </div> */}

          {/* Botón de Registrar */}
          <div className="col-span-1 md:col-span-2 flex items-center justify-center mt-4">
            <button
              type="submit"
              className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-40"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}