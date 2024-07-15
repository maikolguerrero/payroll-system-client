// import React, { useState, useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Dashboard from './views/Dashboard';
// import Payroll from './views/Payroll';
// import Employees from './views/Employees';
// import Departments from './views/Departments';
// import Positions from './views/Positions';
// import Reports from './views/Reports';
// import PerceptionsDeductions from './views/PerceptionsDeductions';
// import Attendances from './views/Attendances';
// import Banks from './views/Banks';
// import Settings from './views/Settings';
// import CompanySettings from './views/CompanySettings';
// import UserProfile from './views/UserProfile';
// import Users from './views/admin/Users';
// import paths from './config/routePaths';
// import { FiMenu } from "react-icons/fi";
// import Login from "./views/Login";
// import Register from "./views/Register";
// import CompanyRegister from "./views/CompanyRegister";

// export default function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false);
//       }
//     };

//     // Set initial state based on window size
//     handleResize();

//     // Add event listener for window resize
//     window.addEventListener('resize', handleResize);

//     // Cleanup event listener on component unmount
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <>
//       <div className="flex h-screen bg-principalAzul">
//         {/* Botón de menú hamburguesa fuera del sidebar */}
//         <button
//           className={`text-white p-1 focus:outline-none z-50 md:hidden ${isSidebarOpen ? 'hidden' : 'fixed'}`}
//           onClick={toggleSidebar}
//         >
//           <FiMenu className="w-6 h-6" />
//         </button>

//         <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//         <main
//           className={`flex-1 p-4 overflow-y-auto transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'ml-56' : 'ml-0'} md:ml-56`}
//         >
//           <Routes>
//             <Route index element={<Dashboard />} />
//             <Route path={paths.DASHBOARD_PATH} element={<Dashboard />} />
//             <Route path={paths.PAYROLL_PATH} element={<Payroll />} />
//             <Route path={paths.EMPLOYEES_PATH} element={<Employees />} />
//             <Route path={paths.DEPARTMENTS_PATH} element={<Departments />} />
//             <Route path={paths.POSITIONS_PATH} element={<Positions />} />
//             <Route path={paths.REPORTS_PATH} element={<Reports />} />
//             <Route path={paths.PERCEPTIONS_DEDUCTIONS_PATH} element={<PerceptionsDeductions />} />
//             <Route path={paths.ATTENDANCES_PATH} element={<Attendances />} />
//             <Route path={paths.BANKS_PATH} element={<Banks />} />
//             <Route path={paths.SETTINGS_PATH} element={<Settings />} />
//             <Route path={paths.COMPANY_SETTINGS_PATH} element={<CompanySettings />} />
//             <Route path={paths.USER_PROFILE_PATH} element={<UserProfile />} />
//             <Route path={paths.USERS_PATH} element={<Users />} />


//             <Route path={paths.COMPANY_REGISTER_PATH} element={<CompanyRegister />} />


//             <Route path="*" element={<h1>Error 404</h1>} />
//           </Routes>
//         </main>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { FiMenu } from "react-icons/fi";
import Login from "./views/Login";
import Register from "./views/Register";
import CompanyRegister from "./views/CompanyRegister";

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state based on window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDisableSidebar = location.pathname === paths.COMPANY_REGISTER_PATH || location.pathname === paths.LOGIN_PATH || location.pathname === paths.REGISTER_PATH;

  return (
    <>
      <div className="flex h-screen bg-principalAzul">
        {/* Botón de menú hamburguesa fuera del sidebar */}
        {!isDisableSidebar && (
          <button
            className={`text-white p-1 focus:outline-none z-50 md:hidden ${isSidebarOpen ? 'hidden' : 'fixed'}`}
            onClick={toggleSidebar}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        )}

        {!isDisableSidebar && (
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <main
          className={`flex-1 overflow-y-auto transition-transform duration-300 ease-in-out ${isSidebarOpen && !isDisableSidebar ? 'ml-56 p-4 md:ml-56' : 'ml-0 pb-16'} ${isDisableSidebar ? '' : 'md:ml-56'}`}
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

            <Route path={paths.COMPANY_REGISTER_PATH} element={<CompanyRegister />} />
            <Route path={paths.LOGIN_PATH} element={<Login />} />
            <Route path={paths.REGISTER_PATH} element={<Register />} />

            <Route path="*" element={<h1>Error 404</h1>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

