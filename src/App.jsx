import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Settings from './views/Settings';
import CompanySettings from './views/CompanySettings';
import UserProfile from './views/UserProfile';
import Users from './views/admin/Users';
import paths from './config/routePaths';
import {
  FiMenu,
} from "react-icons/fi";

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-principalAzul">
      {/* Botón de menú hamburguesa fuera del sidebar */}
      <button
        className={`text-white p-2 focus:outline-none top-4 left-4 z-50 md:hidden ${isSidebarOpen ? 'hidden' : 'fixed'}`}
        onClick={toggleSidebar}
      >
        <FiMenu className="w-4 h-4" />
      </button>

      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-1 p-4 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'ml-56' : 'ml-0'} transition-all`}
      >
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path={paths.DASHBOARD_PATH} element={<Dashboard />} />
          <Route path={paths.PAYROLL_PATH} element={<Payroll />} />
          <Route path={paths.EMPLOYEES_PATH} element={<Employees />} />
          <Route path={paths.DEPARTMENTS_PATH} element={<Departments />} />
          <Route path={paths.POSITIONS_PATH} element={<Positions />} />
          <Route path={paths.REPORTS_PATH} element={<Reports />} />
          <Route path={paths.PERCEPTIONS_DEDUCTIONS_PATH} element={<PerceptionsDeductions />} />
          <Route path={paths.ATTENDANCES_PATH} element={<Attendances />} />
          <Route path={paths.BANKS_PATH} element={<Banks />} />
          <Route path={paths.SETTINGS_PATH} element={<Settings />} />
          <Route path={paths.COMPANY_SETTINGS_PATH} element={<CompanySettings />} />
          <Route path={paths.USER_PROFILE_PATH} element={<UserProfile />} />
          <Route path={paths.USERS_PATH} element={<Users />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </main>
    </div>
  );
}
