import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination ({ currentPage, totalPages, onPageChange }) {
  const PAGE_LIMIT = 4; // Número máximo de botones de página a mostrar

  // Cálculo de los números de página a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const halfLimit = Math.floor(PAGE_LIMIT / 2);

    let startPage = Math.max(currentPage - halfLimit, 1);
    let endPage = Math.min(currentPage + halfLimit, totalPages);

    // Ajustar los límites si se está cerca del inicio o final
    if (currentPage - halfLimit < 1) {
      endPage = Math.min(PAGE_LIMIT, totalPages);
    }
    if (currentPage + halfLimit > totalPages) {
      startPage = Math.max(totalPages - PAGE_LIMIT + 1, 1);
    }

    // Rellenar los números de página a mostrar
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Page navigation example" className="flex justify-center mt-4">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg ${currentPage === 1 ? 'hidden' : 'hover:bg-gray-300'} hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <FiChevronLeft className="w-2.5 h-2.5" />
          </button>
        </li>
        {/* Botón de primera página si no estamos mostrando las primeras páginas */}
        {currentPage > PAGE_LIMIT && (
          <li>
            <button
              onClick={() => onPageChange(1)}
              className="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </button>
          </li>
        )}
        {/* Ellipsis si hay una brecha entre la primera página y la página actual */}
        {currentPage > PAGE_LIMIT + 1 && (
          <li>
            <span className="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</span>
          </li>
        )}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              disabled={currentPage === number}
              className={`flex items-center justify-center px-2 h-8 leading-tight ${currentPage === number
                  ? 'text-white border border-blue-300 bg-principalAzulTono3 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
            >
              {number}
            </button>
          </li>
        ))}
        {/* Ellipsis si hay una brecha entre la página actual y la última página */}
        {currentPage < totalPages - PAGE_LIMIT && (
          <li>
            <span className="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</span>
          </li>
        )}
        {/* Botón de última página si no estamos mostrando las últimas páginas */}
        {currentPage < totalPages - PAGE_LIMIT + 1 && (
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              className="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {totalPages}
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${currentPage === totalPages ? 'hidden' : 'hover:bg-gray-300'} hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <FiChevronRight className="w-2.5 h-2.5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};