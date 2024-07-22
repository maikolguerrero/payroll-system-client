import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { Contexto } from "../../../context/Contexto";
import formValidation from "../../../validations/formValidation";
import { alertConfirm, alertError, alertInfo } from "../../alerts/alerts";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../../PDF";

export default function FormEmployeesPayroll() {
  const { peticionGet, peticionPost } = useContext(Contexto);

  const [values, setValues] = useState({
    period: "",
    start_date: "",
    end_date: "",
    payment_date: "",
    deductions: [],
    perceptions: [],
  });
  const [deduction, setDeduction] = useState("");
  const [deductions, setDeductions] = useState([]);
  const [perception, setPerception] = useState("");
  const [perceptions, setPerceptions] = useState([]);
  const [employees, setEmployees] = useState([])
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const realizarPeticion = async () => {
      const respuesta = await peticionGet(
        "http://localhost:3000/api/deductions/all",
        "GET"
      );
      setDeductions(respuesta);
      const respuesta2 = await peticionGet(
        "http://localhost:3000/api/perceptions/all",
        "GET"
      );
      const respuesta3 = await peticionGet(
        "http://localhost:3000/api/employees/all",
        "GET"
      );
      setEmployees(respuesta3);
      setPerceptions(respuesta2);
    };

    realizarPeticion();
  }, []);

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

  const handleAdd = (key, data) => {
    let error = formValidation.validateText(data);
    if (!error) return alertInfo("Llena el campo para agregarlo a la nómina");
    let actualizado = values[key];
    actualizado.push(data);
    setValues({
      ...values,
      [key]: actualizado,
    });
    if (key === "perceptions") {
      setPerceptions(perceptions.filter((item) => item._id !== perception));
      setPerception("");
    } else {
      setDeductions(deductions.filter((item) => item._id !== deduction));
      setDeduction("");
    }
    return alertConfirm("Se agrego la selección a la nómina");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) return alertInfo(validate);
    const respuesta = await peticionPost(
      `http://localhost:3000/api/payrolls/generate/general`,
      "POST",
      values
    );
    if (respuesta.message) {
      console.log(respuesta);
      alertConfirm(respuesta.message);
      respuesta.payrolls.forEach(item => {
        employees.forEach(item2 => {
          if (item.employee_id === item2._id) {
            item.name = item2.name
            item.surnames = item2.surnames
          }
        });
      });
      setInfo(respuesta.payrolls);
      return;
    } else {
      alertError("Existio un error revisa la consola");
      return console.log(respuesta);
    }
  };

  return (
    <>
      <form className="p-8 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-12 w-full">
          {/* Campo perido */}
          <div className="mb-4">
            <label
              htmlFor="period"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Periodo
            </label>
            <input
              type="text"
              id="period"
              name="period"
              value={values.period}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Inicio fecha */}
          <div className="mb-4">
            <label
              htmlFor="start_date"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={values.start_date}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo Inicio Fin */}
          <div className="mb-4">
            <label
              htmlFor="end_date"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha de Fin
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={values.end_date}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
          {/* Campo fecha de pago */}
          <div className="mb-4">
            <label
              htmlFor="payment_date"
              className="block text-md font-medium font-roboto-serif mb-2"
            >
              Fecha de Pago
            </label>
            <input
              type="date"
              id="payment_date"
              name="payment_date"
              value={values.payment_date}
              onChange={handleInputChange}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            />
          </div>
        </div>
        {/* Campo Deducciones */}
        <div className="mb-4 mt-8 w-full">
          <label
            htmlFor="deductions"
            className="block text-md font-medium font-roboto-serif mb-2"
          >
            Deduciones
          </label>
          <div className="flex gap-4">
            <select
              type="text"
              id="deductions"
              name="deductions"
              value={deduction}
              onChange={(e) => setDeduction(e.target.value)}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            >
              <option value="">Escoge una Deducción</option>
              {deductions.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.type}
                </option>
              ))}
            </select>
            <IoIosAddCircle
              className="text-4xl text-black hover:cursor-pointer"
              onClick={(e) => handleAdd("deductions", deduction)}
            />
          </div>
        </div>
        {/* Campo Percepciones */}
        <div className="mb-4 w-full">
          <label
            htmlFor="perceptions"
            className="block text-md font-medium font-roboto-serif mb-2"
          >
            Percepciones
          </label>
          <div className="flex gap-4">
            <select
              type="text"
              id="perceptions"
              name="perceptions"
              value={perception}
              onChange={(e) => setPerception(e.target.value)}
              className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
            >
              <option value="">Escoge una Percepcion</option>
              {perceptions.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.type}
                </option>
              ))}
            </select>
            <IoIosAddCircle
              className="text-4xl text-black hover:cursor-pointer"
              onClick={(e) => handleAdd("perceptions", perception)}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <button className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
            Generar Nómina
          </button>
        </div>
      </form>

      {info === null ? (
        <></>
      ) : (
        <PDFDownloadLink document={<PDF data={info}/>} fileName="ReporteNominaEmpleado.pdf">
          {({ loading, url, error, blob }) =>
            loading ? (
              <button className="text-center w-full text-xl">Loading Document ...</button>
            ) : (
              <button className="text-center w-full text-xl">Descargar Reporte en PDF!</button>
            )
          }
        </PDFDownloadLink>
      )}
    </>
  );
}
