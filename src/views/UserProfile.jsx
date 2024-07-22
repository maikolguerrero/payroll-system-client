import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import {
  alertBasic,
  alertError,
  alertConfirm,
} from "../components/alerts/alerts"; // Importar alertas

// Funciones de validación
const validators = {
  name: (value) => /^[a-zA-Z\s]*$/.test(value),
  phone: (value) => /^\d*$/.test(value),
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]*$/.test(value) || value === "",
};

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Manejador de cambios en el archivo de imagen de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Manejador de cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Actualizar datos del usuario
    setUserData((prevData) => ({ ...prevData, [id]: value }));

    // Validar el valor según el tipo de campo utilizando la función genérica
    if (validators[id] && !validators[id](value)) {
      switch (id) {
        case "name":
          setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "El nombre solo puede contener letras y espacios.",
          }));
          break;
        case "phone":
          setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "El teléfono solo puede contener números.",
          }));
          break;
        case "email":
          setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "Ingrese un correo electrónico válido.",
          }));
          break;
        default:
          setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
      }
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };

  // Manejador del botón de cancelar
  const handleCancel = () => {
    setUserData({ name: "", email: "", phone: "", address: "" });
    setProfileImage(null);
    setErrors({ name: "", email: "", phone: "" });
    alertInfo("Los cambios han sido cancelados.");
  };

  // Manejador del botón de guardar
  const handleSave = () => {
    if (Object.values(errors).every((error) => error === "")) {
      console.log("User Data:", userData);
      alertConfirm("Los cambios han sido guardados con éxito.");
    } else {
      alertError(
        "Existen errores en el formulario. Por favor, corríjalos antes de guardar."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-principalAzul dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] w-full max-w-3xl xs:mx-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <label htmlFor="profileImage" className="cursor-pointer">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 dark:border-gray-800 shadow-md"
                />
              ) : (
                <div className="w-40 h-40 rounded-full flex items-center border-4 justify-center dark:bg-gray-600 dark:border-gray-800 shadow-md">
                  <FiUser className="text-gray-400" size={80} />
                </div>
              )}
              <input
                type="file"
                id="profileImage"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 border-4 border-gray-400 dark:bg-gray-800 p-1 rounded-full cursor-pointer shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black dark:text-gray-300"
              >
                Nombre y Apellido
              </label>
              <input
                type="text"
                id="name"
                value={userData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-transparent shadow appearance-none rounded-[9px] mobile:w-full w-11/12 bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black dark:text-gray-300"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-transparent shadow appearance-none rounded-[9px] mobile:w-full w-11/12 bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-black dark:text-gray-300"
              >
                Teléfono
              </label>
              <input
                type="text"
                id="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-transparent shadow appearance-none rounded-[9px] mobile:w-full w-11/12 bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-black dark:text-gray-300"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                value={userData.address}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-transparent shadow appearance-none rounded-[9px] mobile:w-full w-11/12 bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
          <div className="flex justify-end mt-14 space-x-4 w-full xs:items-center">
            <button
              onClick={handleCancel}
              className="text-black dark:text-white bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 font-medium py-2 px-6 rounded-[9px] focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="leading-tight bg-principalAzulTono5 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-[9px] focus:outline-none focus:shadow-outline"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
