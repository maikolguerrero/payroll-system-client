import { Label, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import formValidation from "../../../validations/formValidation";
import { alertConfirm, alertError, alertInfo } from "../../alerts/alerts";
import { Contexto } from "../../../context/Contexto";

export default function FormDeductions({ submit, current, table, onClose, onSubmit }) {
  const { peticionPost } = useContext(Contexto);

  const [values, setValues] = useState({
    type: current ? current.type : "",
    amount: current ? current.amount : "",
    date: current ? current.date.split("T00:00:00.000Z").join('') : "",
    description: current ? current.description : ""
  });

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     "date": values.date.split("T00:00:00.000Z").join('')
  //   });
  // }, [current]);

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

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) alertInfo(validate);

    if (current) {
      let respuesta = ''
      if (table === 'Percepciones') {
        respuesta = await peticionPost(
          `http://localhost:3000/api/perceptions/${current._id}`,
          "PUT",
          values
        );
      } else {
        respuesta = await peticionPost(
          `http://localhost:3000/api/deductions/${current._id}`,
          "PUT",
          values
        );
      }
      if (respuesta.message) {
        alertConfirm(respuesta.message);
        return onClose();
      } else {
        return alert(respuesta.error);
      }
    } else {
      let respuesta = ''
      if (table === 'Percepciones') {
        respuesta = await peticionPost(
          "http://localhost:3000/api/perceptions",
          "POST",
          values
        );
      } else {
        respuesta = await peticionPost(
          "http://localhost:3000/api/deductions",
          "POST",
          values
        );
      }
      if (respuesta.message) {
        alertConfirm(respuesta.message);
        return onClose();
      } else {
        return alertError(respuesta.error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) alertInfo(validate);

    let respuesta;

    if (current) {
      if (table === 'Percepciones') {
        respuesta = await peticionPost(
          `http://localhost:3000/api/perceptions/${current._id}`,
          "PUT",
          values
        );
      } else {
        respuesta = await peticionPost(
          `http://localhost:3000/api/deductions/${current._id}`,
          "PUT",
          values
        );
      }
    } else {
      if (table === 'Percepciones') {
        respuesta = await peticionPost(
          "http://localhost:3000/api/perceptions",
          "POST",
          values
        );
      } else {
        respuesta = await peticionPost(
          "http://localhost:3000/api/deductions",
          "POST",
          values
        );
      }
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
          {/* Campo Tipo */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Tipo
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={values.type}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Fecha */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
        </div>
        {/* Campo Monto */}
        <div className="mb-4 w-full">
          <label
            htmlFor="amount"
            className="block text-md font-medium font-roboto-serif mb-2"
          >
            Monto
          </label>
          <input
            min={0}
            type="number"
            id="amount"
            name="amount"
            value={values.amount}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
          />
        </div>
        {/* Campo Descripcion */}
        <div className="mb-4 w-full">
          <label
            htmlFor="description"
            className="block text-md font-medium font-roboto-serif mb-2"
          >
            Descripción
          </label>
          <textarea
            min={0}
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
          />
        </div>
        <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
          {submit}
        </button>
      </form>
    </>
  );
}