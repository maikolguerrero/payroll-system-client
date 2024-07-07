import React from 'react';

export default function SearchBar({ placeholder, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    onSearch(query);
  };

  return (
    <form className="flex items-center mb-4" onSubmit={handleSubmit}>
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          id="default-search"
          name="search"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-principalAzulTono5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-principalAzulTono5"
          placeholder={placeholder}
          required
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center px-2 text-white bg-principalAzulTono5 hover:bg-principalAzulTono3 focus:ring-4 focus:outline-none focus:ring-principalAzulTono5 font-medium rounded-r-lg text-xs py-1 dark:bg-principalAzulTono5 dark:hover:bg-principalAzulTono2 dark:focus:ring-principalAzulTono5"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}