import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiClipboard,
  FiDollarSign,
  FiBriefcase,
  FiLayers,
  FiFileText,
  FiBriefcase as FiBriefcaseIcon,
  FiX
} from 'react-icons/fi';
import UserProfileDropdown from './UserProfileDropdown';
import paths from '../config/routePaths';

const company = {
  logo: null,
  name: 'Nombre de la Empresa',
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-56 h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-lg`}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col justify-between px-2 py-4 bg-principalAzulTono5 text-white scrollbar-hidden">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold mb-4 mt-4">Payroll System</h2>
            <button
              className={`text-white p-2 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
              onClick={toggleSidebar}
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-1 text-xs font-medium">
            <li>
              <NavLink
                to={paths.DASHBOARD_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiHome className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.PAYROLL_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiDollarSign className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Nóminas
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.EMPLOYEES_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiUsers className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Empleados
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.DEPARTMENTS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiLayers className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Departamentos
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.POSITIONS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiBriefcase className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Cargos
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.REPORTS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiFileText className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Reportes
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.PERCEPTIONS_DEDUCTIONS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiClipboard className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Percepciones y Deducciones
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.ATTENDANCES_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiCalendar className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Asistencias
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.BANKS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiBarChart2 className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Bancos
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.SETTINGS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiSettings className="flex-shrink-0 w-4 h-4 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-2 whitespace-nowrap">
                  Configuración
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="border-t border-principalAzulTono2 mt-4 pt-4">
          <div className="flex items-center mb-4">
            <NavLink
              to={paths.COMPANY_SETTINGS_PATH}
              className="flex items-center rounded-full p-2 hover:bg-principalAzul"
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt="Company Logo"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <FiBriefcaseIcon className="w-6 h-6 text-white" />
              )}
              <span className="ml-2 text-xs font-semibold">{company.name}</span>
            </NavLink>
          </div>
          <div className="flex items-center">
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
