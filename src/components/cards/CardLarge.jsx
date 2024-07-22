import React from "react";

export default function CardLarge({ title, modal, number }) {
  return (
    <div 
      onClick={e => modal(number)} 
      className="bg-white dark:bg-gray-800 rounded-xl py-12 px-8 flex justify-center items-center flex-col gap-6 drop-shadow-[15px_25px_rgba(0,66,111,0.25)] dark:drop-shadow-[0px_10px_15px_rgba(0,0,0,0.5)] hover:cursor-pointer"
    >
      <h3 className="text-gray-900 dark:text-gray-100 text-2xl text-center font-bold">
        {title}
      </h3>
    </div>
  );
}
