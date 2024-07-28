import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Table({ columns, data, onEdit, onDelete, pdf, onDownloadPDF }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-principalAzulTono5">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-4 py-3">
                {column.label}
              </th>
            ))}
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-4">
                  {item[column.accessor]}
                </td>
              ))}
              <td className="px-4 py-4 text-right flex space-x-4 justify-end">

                {pdf ? (
                  <button onClick={() => onDownloadPDF(item)} className="text-green-500 hover:text-green-700 ml-4">Descargar PDF</button>
                ) : (
                  <>
                    <button
                      onClick={() => onEdit(item)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button></>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}