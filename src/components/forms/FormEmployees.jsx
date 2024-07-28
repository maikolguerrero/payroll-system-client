import React, { useContext, useState } from "react";
import { Contexto } from "../../context/Contexto";
import formValidation from "../../validations/formValidation";
import { alertConfirm, alertError, alertInfo } from "../alerts/alerts";

const FormEmployees = ({ employee, onClose, onSubmit }) => {
  const { departmentsData, positionsData, peticionPost } = useContext(Contexto);

  const [values, setValues] = useState({
    ci: employee ? employee.ci : "",
    name: employee ? employee.name : "",
    surnames: employee ? employee.surnames : "",
    address: employee ? employee.address : "",
    phone: employee ? employee.phone : "",
    email: employee ? employee.email : "",
    birthdate: employee ? employee.birthdate : "",
    base_salary: employee ? employee.base_salary : "",
    gender: employee ? employee.gender : "",
    hire_date: employee ? employee.hire_date : "",
    department_id: employee ? employee.department_id : "",
    position_id: employee ? employee.position_id : "",
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

    if (employee) {
      respuesta = await peticionPost(
        `http://localhost:3000/api/employees/${employee._id}`,
        "PUT",
        values
      );
    } else {
      respuesta = await peticionPost(
        "http://localhost:3000/api/employees",
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
    <form
      className="grid md:grid-cols-2 justify-center"
      onSubmit={handleSubmit}
    >
      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            Nombres
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
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Apellidos
          </label>
          <input
            type="text"
            id="surnames"
            name="surnames"
            value={values.surnames}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label
            htmlFor="department"
            className="block text-sm font-medium mb-2"
          >
            Departamento
          </label>
          <select
            id="department_id"
            name="department_id"
            value={values.department_id}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un departamento</option>
            {departmentsData.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Cargo
          </label>
          <select
            id="position_id"
            name="position_id"
            value={values.position_id}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un cargo</option>
            {positionsData.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label
            htmlFor="baseSalary"
            className="block text-sm font-medium mb-2"
          >
            Salario Base
          </label>
          <input
            type="number"
            id="base_salary"
            name="base_salary"
            value={values.base_salary}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Fecha de Ingreso
          </label>
          <input
            type="date"
            id="hire_date"
            name="hire_date"
            value={values.hire_date}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="birthDate" className="block text-sm font-medium mb-2">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={values.birthdate}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="idNumber" className="block text-sm font-medium mb-2">
            Cédula de Identidad
          </label>
          <input
            type="text"
            id="ci"
            name="ci"
            value={values.ci}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="gender" className="block text-sm font-medium mb-2">
            Género
          </label>
          <select
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
      </div>

      <div className="mb-4 xs:ml-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-5/6 md:ml-auto mr-8">
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Teléfono
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleInputChange}
            className="shadow appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-800 leading-tight bg-gray-300 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center mt-4">
        <button
          type="submit"
          className="leading-tight bg-principalAzulTono5 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-[9px] focus:outline-none focus:shadow-outline w-32"
        >
          {employee ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
};

export default FormEmployees;