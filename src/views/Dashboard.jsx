import React from 'react';
import CardRute from "../components/CardRute";
import {
  FiUsers,
  FiDollarSign,
  FiBarChart2,
  FiBriefcase as FiBriefcaseIcon,
} from 'react-icons/fi';
import { MdNotificationsActive } from "react-icons/md";
import { TbReportSearch, TbDiscount } from "react-icons/tb";
import { FaHourglassHalf } from "react-icons/fa";
import { HiCash } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";

const card = [
  {title: "Resumen Nóminas", icon: <FiDollarSign/>, path: ''},
  {title: "Resumen Empleados", icon: <FiUsers/>, path: ''},
  {title: "Notificaciones", icon: <MdNotificationsActive/>, path: ''},
  {title: "Reportes", icon: <TbReportSearch/>, path: ''},
  {title: "Resumen Bancos", icon: <FiBarChart2/>, path: ''},
  {title: "Resumen Asistencias", icon: <FaHourglassHalf/>, path: ''},
  {title: "Configuración Percepciones", icon: <HiCash/>, path: ''},
  {title: "Configuración Deducciones", icon: <TbDiscount/>, path: ''},
  {title: "Configuración Nómina", icon: <BsCashCoin/>, path: ''}
]

export default function Dashboard() {
  return (
    <div className="p-8 bg-principalAzul dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl text-white dark:text-gray-100 font-bold mb-4 text-left">
        Dashboard
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
        {card.map((item, index) => (
          <CardRute key={index} icon={item.icon} title={item.title}/>
        ))}
      </section>
    </div>
  );
}
