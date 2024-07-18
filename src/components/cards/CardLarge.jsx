import React from "react";

export default function CardLarge({ title, modal, number }) {
  return (
    <>
      <div onClick={e => modal(number)} className="bg-white rounded-xl py-12 px-8 flex justify-center items-center flex-col gap-6 drop-shadow-[15px_25px_rgba(0,66,111,0.25)] hover:cursor-pointer">
        <h3 className="color-black text-2xl text-center font-bold font">
          {title}
        </h3>
      </div>
    </>
  );
}
