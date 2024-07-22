import React from "react";

export default function CardRute({ icon, title }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl p-8 flex justify-center items-center flex-col gap-6 drop-shadow-[15px_25px_rgba(0,66,111,0.25)] hover:cursor-pointer">
      <span className="text-7xl">{icon}</span>
      <h3 className="text-xl text-center font-bold">
        {title}
      </h3>
    </div>
  );
}
