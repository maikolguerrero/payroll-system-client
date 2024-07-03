
import Sidebar from "./components/Sidebar_";
import { Route, Routes, Navigate } from "react-router-dom";
import paths from "./config/routePaths";
import Dashboard from "./views/Dashboard";
import Payroll from "./views/Payroll";
import Employees from "./views/Employees";
import Departments from "./views/Departments";
import Positions from "./views/Positions";
import Reports from "./views/Reports";
import PerceptionsDeductions from "./views/PerceptionsDeductions";
import Attendances from "./views/Attendances";
import Banks from "./views/Banks";
import Settings from "./views/Settings";
import CompanySettings from "./views/CompanySettings";
import UserProfile from "./views/UserProfile";

export default function App() {
  return (
    <>
      <div className="flex flex-1">
        <Sidebar />
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
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </div>
    </>
  );
}
