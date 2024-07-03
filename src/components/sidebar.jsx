import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiClipboard,
  FiDollarSign,
  FiCheckCircle,
  FiBriefcase,
  FiLayers,
  FiFileText,
  FiUser,
  FiBriefcase as FiBriefcaseIcon // Icono de empresa
} from "react-icons/fi";
import paths from "../config/routePaths";

const user = {
  profileImage: null, // URL de la imagen de perfil del usuario, null si no tiene
  name: "Nombre del Usuario",
  username: "@username",
};

const company = {
  logo: null, // URL del logo de la empresa, null si no tiene
  name: "Nombre de la Empresa",
};

export default function MySidebar() {
  return (
    <aside
      className="shadow-lg top-0 left-0 z-40 w-72 h-full"
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto bg-principalAzulTono5 text-white">
        <div>
          <h2 className="text-2xl font-bold mb-6">Payroll System</h2>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to={paths.DASHBOARD_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiHome className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.PAYROLL_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiDollarSign className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Nóminas
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.EMPLOYEES_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiUsers className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Empleados
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.DEPARTMENTS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiLayers className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Departamentos
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.POSITIONS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiBriefcase className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Cargos
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.REPORTS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiFileText className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Reportes
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.PERCEPTIONS_DEDUCTIONS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiClipboard className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Percepciones y Deducciones
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.ATTENDANCES_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiCalendar className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Asistencias
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.BANKS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiBarChart2 className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Bancos
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={paths.SETTINGS_PATH}
                className="flex items-center p-2 text-white rounded-lg hover:bg-principalAzulTono2 group"
              >
                <FiSettings className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
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
              className="flex items-center"
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt="Company Logo"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FiBriefcaseIcon className="w-10 h-10 text-white" />
              )}
              <span className="ml-3 text-lg font-semibold">{company.name}</span>
            </NavLink>
          </div>
          <div className="flex items-center">
            <NavLink
              to={paths.USER_PROFILE_PATH}
              className="flex items-center"
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FiUser className="w-10 h-10 text-white rounded-full" />
              )}
              <div className="ml-3">
                <span className="block text-lg font-semibold">{user.name}</span>
                <span className="block text-sm">
                  {user.username}
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
}
