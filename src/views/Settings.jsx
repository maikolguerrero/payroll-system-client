import { useState, useEffect } from "react";

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy");
  const [language, setLanguage] = useState("spanish");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    // Aplicar la clase dark si el tema es oscuro
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleSaveChanges = (event) => {
    event.preventDefault();
    localStorage.setItem("theme", theme);
    localStorage.setItem("dateFormat", dateFormat);
    localStorage.setItem("language", language);
    localStorage.setItem("timezone", timezone);

    // Aplicar el tema seleccionado
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleCancelChanges = () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    const savedDateFormat = localStorage.getItem("dateFormat") || "dd/mm/yyyy";
    const savedLanguage = localStorage.getItem("language") || "spanish";
    const savedTimezone = localStorage.getItem("timezone") || "";
    setDateFormat(savedDateFormat);
    setLanguage(savedLanguage);
    setTimezone(savedTimezone);

    // Aplicar el tema guardado
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-[10px] drop-shadow-[25px_40px_rgba(0,66,111,0.25)] dark:shadow-xl w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Configuración del Sistema
        </h2>
        <form onSubmit={handleSaveChanges} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="dateFormat" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Formato de Fecha
              </label>
              <select
                id="dateFormat"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                <option value="mm/dd/yyyy">mm/dd/yyyy</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="theme" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Tema
              </label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="language" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Idioma
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="spanish">Español</option>
                <option value="english">Inglés</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="w-full md:w-5/6">
              <label htmlFor="timezone" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                Zona Horaria
              </label>
              <input
                type="text"
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="dark:shadow-md appearance-none border-transparent rounded-[9px] py-2 px-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
          <div className="mb-8 md:mb-12"></div>
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleCancelChanges}
              className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-principalAzulTono5 dark:bg-blue-600 hover:bg-principalAzulTono4 dark:hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
