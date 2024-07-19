import { useState } from "react";
import CardLarge from "../components/cards/CardLarge";
import Modal from "../components/Modal";
import FormEmployeesPayroll from "../components/forms/payroll/FormEmployeesPayroll";
import FormEmployeesOne from "../components/forms/payroll/FormEmployeesOne";
import FormEPayrolldepartments from "../components/forms/payroll/FormPayrolldepartments";
import FormPayrollCharges from "../components/forms/payroll/FormPayrollCharges";

const card = [
  {title: "Generar nómina general de empleados" },
  {title: "Generar nómina de un empleado" },
  {title: "Generar nómina por departamentos" },
  {title: "Generar nómina por cargos" }
]

export default function Payroll() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const closeModals = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
    setIsModalOpen4(false);
  };

  const openModal = (type) => {
    if (type === 1) {
      setIsModalOpen(true)
    }
    if (type === 2) {
      setIsModalOpen2(true)
    }
    if (type === 3) {
      setIsModalOpen3(true)
    }
    if (type === 4) {
      setIsModalOpen4(true)
    }
  }

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl text-white font-bold mb-4 text-left">
          Nóminas
        </h1>
        <section className="grid grid-cols-1 gap-12 p-12">
          {card.map((item, index) => (
            <CardLarge key={index} title={item.title} modal={openModal} number={index+1}/>
          ))}
        </section>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModals}
          title={"Generar Nómina por Empleados"}
        >
          <FormEmployeesPayroll />
        </Modal>
        <Modal
          isOpen={isModalOpen2}
          onClose={closeModals}
          title={"Generar Nómina de un Empleado"}
        >
          <FormEmployeesOne />
        </Modal>
        <Modal
          isOpen={isModalOpen3}
          onClose={closeModals}
          title={"Generar Nómina por Departamento"}
        >
          <FormEPayrolldepartments />
        </Modal>
        <Modal
          isOpen={isModalOpen4}
          onClose={closeModals}
          title={"Generar Nómina por Cargo"}
        >
          <FormPayrollCharges />
        </Modal>
      </div>
    </>
  );
}
