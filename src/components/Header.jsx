import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-principalAzulTono5 py-4 absolute top-0">
      <div className="container mx-auto px-4 flex justify-start">
        <h1 className="text-white text-xl md:text-2xl font-nunito">
          Payroll System
        </h1>
      </div>
    </header>
  )
}