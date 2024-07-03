import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiChevronUp } from 'react-icons/fi';
import paths from '../config/routePaths';

const user = {
  profileImage: null, // URL de la imagen de perfil del usuario, null si no tiene
  name: "Nombre del Usuario",
  username: "@username",
};

export default function UserProfileDropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative text-white">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-xs font-medium rounded-full p-1 hover:bg-principalAzul"
        type="button"
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="User Profile"
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <FiUser className="w-6 h-6 text-white" />
        )}
        <div className="ml-2 flex flex-col items-start">
          <span className="block text-xs font-semibold">{user.name}</span>
          <span className="block text-xs">{user.username}</span>
        </div>
        <FiChevronUp className={`ml-2 w-3 h-3 text-white transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-3 py-2 text-xs text-gray-900 dark:text-white">
            <div className="font-medium">{user.name}</div>
            <div className="truncate">{user.username}</div>
          </div>
          <ul className="py-2 text-xs text-gray-700 dark:text-gray-200">
            <li>
              <NavLink
                to={paths.USER_PROFILE_PATH}
                className="block px-3 py-1 hover:bg-principalAzul hover:text-white dark:hover:bg-principalAzulTono2 dark:hover:text-white"
              >
                Perfil
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-1 text-xs text-gray-700 hover:bg-principalAzul hover:text-white dark:hover:bg-principalAzulTono2 dark:text-gray-200 dark:hover:text-white"
              >
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
