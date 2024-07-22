import React from "react";

export default function CardRute({ icon, title }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 flex justify-center items-center flex-col gap-6 shadow-lg dark:shadow-xl hover:cursor-pointer transition-transform transform hover:scale-105">
      <span className="text-7xl text-gray-900 dark:text-gray-100">
        {icon}
      </span>
      <h3 className="text-gray-900 dark:text-gray-100 text-xl text-center font-bold">
        {title}
      </h3>
    </div>
  );
}
