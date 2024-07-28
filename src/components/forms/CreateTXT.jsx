import React, { useState, useContext } from "react";
import { Contexto } from "../../context/Contexto";
import { alertBasic, alertConfirm, alertError } from "../../components/alerts/alerts";

export default function CreateTXT() {
  const { peticionPost, banksData } = useContext(Contexto);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [bankId, setBankId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateStart || !dateEnd || !bankId) {
      alertBasic("Todos los campos son obligatorios.");
      return;
    }

    const url = "http://localhost:3000/api/export_payroll_txt";
    const contenido = {
      bank_id: bankId,
      start_date: dateStart,
      end_date: dateEnd,
    };

    try {
      const response = await peticionPost(url, "POST", contenido);
      if (response.error) {
        alertError(response.error);
      } else {
        alertConfirm(response.message);
        // Redirige al usuario para descargar el archivo
        const fileUrl = `http://localhost:3000/api/exports/${response.fileName}`;
        // window.location.href = fileUrl;
        window.open(fileUrl, '_blank');
      }
    } catch (error) {
      alertError("Error al generar el archivo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 flex flex-col items-center">
      <div className="grid grid-cols-2 gap-x-12 w-full">
        <div className="mb-4">
          <label htmlFor="dateStart" className="block text-md font-medium font-roboto-serif mb-2">
            Fecha Inicio
          </label>
          <input
            type="date"
            id="dateStart"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateEnd" className="block text-md font-medium font-roboto-serif mb-2">
            Fecha Fin
          </label>
          <input
            type="date"
            id="dateEnd"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bank" className="block text-md font-medium font-roboto-serif mb-2">
            Banco
          </label>
          <select
            id="bank"
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
            className="shadow appearance-none border-transparent rounded-[10px] w-full py-2 px-3 text-gray-800 leading-tight bg-gray-300"
          >
            <option value="">Seleccione un banco</option>
            {banksData.map((bank) => (
              <option key={bank._id} value={bank._id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="rounded-xl bg-principalAzulTono5 px-12 py-2 mt-12 text-white text-xl">
        Generar TXT
      </button>
    </form>
  );
}