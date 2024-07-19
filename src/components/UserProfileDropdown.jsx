import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiChevronUp } from "react-icons/fi";
import paths from "../config/routePaths";
import { Contexto } from "../context/Contexto";

export default function UserProfileDropdown() {
  const { user, setUser, setToken } = useContext(Contexto);
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [users, setUsers] = useState({
    profileImage: null, // URL de la imagen de perfil del usuario, null si no tiene
    name: "Nombre del Usuario",
    username: "@username",
  });

  useEffect(() => {
    if (user === null) {
      return;
    } else {
      setUsers({
        profileImage: null, // URL de la imagen de perfil del usuario, null si no tiene
        name: ' ' + user.name,
        username: '@' + user.username,
      });
    }
  }, [user]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  
  const handleLogout = (e) => {
    setUser(null);
    setToken(null);
    navigate(paths.LOGIN_PATH)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-white" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-xs font-medium rounded-full p-1 hover:bg-principalAzul"
        type="button"
      >
        {users.profileImage ? (
          <img
            src={users.profileImage}
            alt="User Profile"
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <FiUser className="w-6 h-6 text-white" />
        )}
        <div className="ml-2 flex flex-col items-start">
          <span className="block text-xs font-semibold">{users.name}</span>
          <span className="block text-xs">{users.username}</span>
        </div>
        <FiChevronUp
          className={`ml-2 w-3 h-3 text-white transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 w-full bottom-full mb-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-3 py-2 text-xs text-gray-900 dark:text-white">
            <div className="font-medium">{users.name}</div>
            <div className="truncate">{users.username}</div>
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
                onClick={handleLogout}
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
