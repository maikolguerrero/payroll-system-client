import React, { useContext, useEffect, useState } from "react";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";
import formValidation from "../../validations/formValidation";
import { Contexto } from "../../context/Contexto";

export default function FormBankSystem({ submit, bank, onClose, onSubmit }) {
  const { peticionPost } = useContext(Contexto)

  const [values, setValues] = useState({
    name: bank ? bank.name : "",
    code: bank ? bank.code : "",
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

    let respuesta;

    if (bank) {
      respuesta = await peticionPost(
        `http://localhost:3000/api/banks/${bank._id}`,
        "PUT",
        values
      );
    } else {
      respuesta = await peticionPost(
        "http://localhost:3000/api/banks",
        "POST",
        values
      );
    }

    if (respuesta.message) {
      alertConfirm(respuesta.message);
      onSubmit();
      onClose();
    } else {
      alertError(respuesta.error);
    }
  };

  return (
    <>
      <form className="p-8 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-12 w-full">
          {/* Campo Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Nombre del Banco
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Codigo */}
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Código
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={values.code}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
        </div>
        <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
          {submit}
        </button>
      </form>
    </>
  );
}
