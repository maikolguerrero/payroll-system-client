import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Payroll from './views/Payroll';
import Employees from './views/Employees';
import Departments from './views/Departments';
import Positions from './views/Positions';
import Reports from './views/Reports';
import PerceptionsDeductions from './views/PerceptionsDeductions';
import Attendances from './views/Attendances';
import Banks from './views/Banks';
import BanksSystem from './views/admin/BanksSystem';
import Settings from './views/Settings';
import CompanySettings from './views/CompanySettings';
import UserProfile from './views/UserProfile';
import Users from './views/admin/Users';
import paths from './config/routePaths';
import Login from "./views/Login";
import Register from "./views/Register";
import CompanyRegister from "./views/CompanyRegister";
import Error404 from "./views/Error404";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  // Estado para controlar la visibilidad del sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // Estado para almacenar la ubicación actual en el enrutador
  const location = useLocation();

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Función para ajustar la visibilidad del sidebar según el tamaño de la ventana
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Configura el estado inicial basado en el tamaño de la ventana
    handleResize();

    // Añade un listener para ajustar el estado del sidebar en el cambio de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpia el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Leer el tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme") || "light";

    // Aplicar el tema guardado
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Determina si el sidebar debe estar deshabilitado basado en la ruta actual
  const isDisableSidebar =
    location.pathname === paths.COMPANY_REGISTER_PATH ||
    location.pathname === paths.LOGIN_PATH ||
    location.pathname === paths.REGISTER_PATH;

  return (
    <div className="flex h-screen bg-principalAzul dark:bg-gray-900">
      {/* Botón de menú hamburguesa visible solo si el sidebar está deshabilitado */}
      {!isDisableSidebar && (
        <button
          className={`text-white p-1 focus:outline-none z-50 md:hidden ${
            isSidebarOpen ? "hidden" : "fixed"
          }`}
          onClick={toggleSidebar}
        >
          <FiMenu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar visible solo si no está deshabilitado */}
      {!isDisableSidebar && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <main
        className={`flex-1 overflow-y-auto transition-transform duration-300 ease-in-out 
          ${isSidebarOpen && !isDisableSidebar ? "ml-56 p-4 md:ml-56" : "ml-0"} 
          ${isDisableSidebar ? "" : "md:ml-56"}`}
      >
        {/* Configuración de las rutas principales y sus componentes */}
          <Routes>
            <Route index element={<ProtectedRoute adminComponent={Dashboard} />} />
            <Route path={paths.DASHBOARD_PATH} element={<ProtectedRoute adminComponent={Dashboard} />} />
            <Route path={paths.PAYROLL_PATH} element={<ProtectedRoute adminComponent={Payroll} />} />
            <Route path={paths.EMPLOYEES_PATH} element={<ProtectedRoute adminComponent={Employees} />} />
            <Route path={paths.DEPARTMENTS_PATH} element={<ProtectedRoute adminComponent={Departments} />} />
            <Route path={paths.POSITIONS_PATH} element={<ProtectedRoute adminComponent={Positions} />} />
            <Route path={paths.REPORTS_PATH} element={<ProtectedRoute adminComponent={Reports} />} />
            <Route path={paths.PERCEPTIONS_DEDUCTIONS_PATH} element={<ProtectedRoute adminComponent={PerceptionsDeductions} />} />
            <Route path={paths.ATTENDANCES_PATH} element={<ProtectedRoute adminComponent={Attendances} />} />
            <Route path={paths.BANKS_PATH} element={<ProtectedRoute adminComponent={Banks} />} />
            <Route path={paths.SETTINGS_PATH} element={<ProtectedRoute adminComponent={Settings} />} />
            <Route path={paths.COMPANY_SETTINGS_PATH} element={<ProtectedRoute adminComponent={CompanySettings} />} />
            <Route path={paths.USER_PROFILE_PATH} element={<ProtectedRoute adminComponent={UserProfile} />} />
            <Route path={paths.USERS_PATH} element={<ProtectedRoute adminComponent={Users} />} />
            <Route path={paths.BANKS_SYSTEM_PATH} element={<ProtectedRoute adminComponent={BanksSystem} />} />

          {/* Rutas públicas */}
          <Route
            path={paths.COMPANY_REGISTER_PATH}
            element={<CompanyRegister />}
          />
          <Route path={paths.LOGIN_PATH} element={<Login />} />
          <Route path={paths.REGISTER_PATH} element={<Register />} />

          {/* Ruta para página 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  );
}
