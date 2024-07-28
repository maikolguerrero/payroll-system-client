import CardRute from "../components/CardRute";
import {
  FiUsers,
  FiDollarSign,
  FiBarChart2,
  FiBriefcase as FiBriefcaseIcon,
} from "react-icons/fi";
import { MdNotificationsActive } from "react-icons/md";
import { TbReportSearch, TbDiscount } from "react-icons/tb";
import { FaHourglassHalf } from "react-icons/fa";
import { HiCash } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import LinesChart from "../components/charts/LineChart";
import { useContext, useEffect, useState } from "react";
import { Contexto } from "../context/Contexto";
import CircleChart from "../components/charts/CircleChart";
import BarsChart from "../components/charts/BarsChart";

const card = [
  { title: "Resumen Nóminas", icon: <FiDollarSign />, path: "" },
  { title: "Resumen Empleados", icon: <FiUsers />, path: "" },
  { title: "Notificaciones", icon: <MdNotificationsActive />, path: "" },
  { title: "Reportes", icon: <TbReportSearch />, path: "" },
  { title: "Resumen Bancos", icon: <FiBarChart2 />, path: "" },
  { title: "Resumen Asistencias", icon: <FaHourglassHalf />, path: "" },
  { title: "Configuración Percepciones", icon: <HiCash />, path: "" },
  { title: "Configuración Deducciones", icon: <TbDiscount />, path: "" },
  { title: "Configuración Nómina", icon: <BsCashCoin />, path: "" },
];

export default function Dashboard() {
  const {
    positionsData,
    employeesData,
    realizarPeticion,
    banksData,
    banksAcountsData,
    perceptionsData,
    deductionsData,
    departmentsData
  } = useContext(Contexto);
  const [positions, setPositions] = useState({});
  const [employees, setEmployees] = useState({});
  const [banks, setBanks] = useState([]);
  const [banksAccounts, setBanksAccounts] = useState([]);
  const [perceptions, setPerceptions] = useState({});
  const [deductions, setDeductions] = useState({});
  const [departmentsArray, setDepartmentsArray] = useState([])
  const [positionsArray, setPositionsArray] = useState([])
  const [departmentCounte, setDepartmentCounte] = useState([])

  useEffect(() => {
    realizarPeticion();
  }, []);

  useEffect(() => {
    let position = {
      base_salary: [],
      name: [],
    };
    let names = []
    positionsData.forEach((item) => {
      position.base_salary.push(item.base_salary);
      position.name.push(item.name);
      names.push(item.name);
    });
    setPositionsArray(names)
    setPositions(position);
  }, [positionsData]);

  useEffect(() => {
    let names = []
    departmentsData.forEach((item) => {
      names.push(item.name);
    });
    setDepartmentsArray(names)
  }, [departmentsData]);

  useEffect(() => {
    let gender = {
      hombre: 0,
      mujer: 0,
    };
    employeesData.forEach((item) => {
      if (item.gender === "Masculino") {
        gender.hombre = gender.hombre + 1;
      } else {
        gender.mujer = gender.mujer + 1;
      }
    });
    setEmployees(gender);
  }, [employeesData]);

  useEffect(() => {
    let banks = [];
    banksData.forEach((item) => {
      banks.push(item.name);
    });
    setBanks(banks);
  }, [banksData]);

  useEffect(() => {
    let banksAccount = [];
    banks.forEach((item) => {
      let bank = item;
      let counter = 0;
      banksAcountsData.forEach((element) => {
        if (element.bank === bank) {
          counter = counter + 1;
        }
      });
      banksAccount.push(counter);
    });
    setBanksAccounts(banksAccount);
  }, [banks]);

  useEffect(() => {
    let counte = [];
    positionsArray.forEach((item) => {
      let cargo = item;
      let counter = 0;
      employeesData.forEach((element) => {
        if (element.position === cargo) {
          counter = counter + 1;
        }
      });
      counte.push(counter);
    });
    setEmployees({
      ...employees,
      ["positions"]: counte
    });
  }, [positionsArray]);

  useEffect(() => {
    let counte = [];
    departmentsArray.forEach((item) => {
      let departamento = item;
      let counter = 0;
      employeesData.forEach((element) => {
        if (element.department === departamento) {
          counter = counter + 1;
        }
      });
      counte.push(counter);
    });
    setDepartmentCounte(counte);
  }, [departmentsArray]);

  useEffect(() => {
    let perception = {
      type: [],
      amount: [],
    };
    perceptionsData.forEach((item) => {
      perception.type.push(item.type);
      perception.amount.push(item.amount);
    });
    setPerceptions(perception);
  }, [perceptionsData]);

  useEffect(() => {
    let deduction = {
      type: [],
      amount: [],
    };
    deductionsData.forEach((item) => {
      deduction.type.push(item.type);
      deduction.amount.push(item.amount);
    });
    setDeductions(deduction);
  }, [deductionsData]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-white font-bold text-left">
          Dashboard
        </h1>
        {/*<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
          {card.map((item, index) => (
            <CardRute key={index} icon={item.icon} title={item.title} />
          ))}
        </section>*/}
      </div>

      <section className="grid grid-cols-1 p-8">
        <div className="bg-white p-4 rounded-xl flex gap-8 justify-center flex-col min-h-[400px] h-auto mb-12">
          <h3 className="text-xl text-black font-bold mb-4 text-center">
            Tabla de Salario por Cargos
          </h3>
          <div className="px-12 pb-6">
            <LinesChart
              left={positions.base_salary}
              bottom={positions.name}
              title_1={"Salario de Cargos"}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl flex gap-8 justify-center flex-col min-h-[400px] h-auto mb-12">
          <h3 className="text-xl text-black font-bold mb-4 text-center">
            Relación de Empleados de la Empresa
          </h3>
          <div className="grid lg:grid-cols-2">
            <span>
              <h4 className="text-lg text-black font-bold mb-4 text-center">
                Generos de Empleados
              </h4>
              <div className="px-12 pb-6 lg:min-h-[350px]">
                <CircleChart
                  compare={["Masculino", "Femenino"]}
                  datos={[employees.hombre, employees.mujer]}
                />
              </div>
            </span>
            <span>
              <h4 className="text-lg text-black font-bold mb-4 text-center">
                Bancos de Empleados
              </h4>
              <div className="px-12 pb-6 lg:min-h-[350px]">
                <CircleChart compare={banks} datos={banksAccounts} />
              </div>
            </span>
            <span>
              <h4 className="text-lg text-black font-bold mb-4 text-center">
                Empleados por Cargo
              </h4>
              <div className="px-12 pb-6 lg:min-h-[350px]">
                <CircleChart
                  compare={positionsArray}
                  datos={employees.positions}
                />
              </div>
            </span>
            <span>
              <h4 className="text-lg text-black font-bold mb-4 text-center">
                Empleados por Departamento
              </h4>
              <div className="px-12 pb-6 lg:min-h-[350px]">
                <CircleChart compare={departmentsArray} datos={departmentCounte} />
              </div>
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl flex gap-8 justify-center flex-col min-h-[400px] h-auto mb-12">
          <h3 className="text-xl text-black font-bold mb-4 text-center">
            Relación de Percepciones
          </h3>
          <div className="px-12 pb-6">
            <BarsChart montos={perceptions.amount} tipos={perceptions.type} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl flex gap-8 justify-center flex-col min-h-[400px] h-auto mb-12">
          <h3 className="text-xl text-black font-bold mb-4 text-center">
            Relación de Deducciones
          </h3>
          <div className="px-12 pb-6">
            <BarsChart montos={deductions.amount} tipos={deductions.type} />
          </div>
        </div>
      </section>
    </>
  );
}