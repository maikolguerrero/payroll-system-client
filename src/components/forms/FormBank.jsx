import React, { useContext, useEffect, useState } from "react";
import { Contexto } from "../../context/Contexto";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";
import formValidation from "../../validations/formValidation";

export default function FormBank({ submit, bank, onClose, onSubmit }) {
  const { employeesData, banksData, peticionPost } = useContext(Contexto);

  const [values, setValues] = useState({
    bank_id: bank ? bank.bank_id : "",
    employee_id: bank ? bank.employee_id : "",
    account_number: bank ? bank.account_number : "",
    account_type: bank ? bank.account_type : "",
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
        `http://localhost:3000/api/banks_accounts/${bank._id}`,
        "PUT",
        values
      );
    } else {
      respuesta = await peticionPost(
        "http://localhost:3000/api/banks_accounts",
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
          {/* Campo Banco */}
          <div className="mb-4">
            <label
              htmlFor="bank_id"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Banco
            </label>
            <select
              id="bank_id"
              name="bank_id"
              value={values.bank_id}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona un empleado</option>
              {banksData.map((item, index) => (
                <option key={index} value={item._id}>
                  {`${item.name}`}
                </option>
              ))}
            </select>
          </div>
          {/* Campo Numero de Cuenta */}
          <div className="mb-4">
            <label
              htmlFor="account_number"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Numero de Cuenta
            </label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              value={values.account_number}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Titular */}
          <div className="mb-4">
            <label
              htmlFor="employee_id"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Empleado
            </label>
            <select
              id="employee_id"
              name="employee_id"
              value={values.employee_id}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona un empleado</option>
              {employeesData.map((item, index) => (
                <option key={index} value={item._id}>
                  {`${item.name} ${item.surnames}`}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Tipo de Cuenta */}
          <div className="mb-4">
            <label
              htmlFor="account_type"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Tipo de Cuenta
            </label>
            <select
              type="text"
              id="account_type"
              name="account_type"
              value={values.account_type}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            >
              <option value="">Seleccione un tipo</option>
              <option value="Ahorro">Ahorro</option>
              <option value="Corriente">Corriente</option>
            </select>
          </div>
        </div>
        <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
          {submit}
        </button>
      </form>
    </>
  );
}
