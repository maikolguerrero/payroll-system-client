import React from "react";
import Header from "../components/Header";
import FormRegister from "../components/forms/FormRegister";

const Register = () => {
  return (
    <div className="min-h-screen bg-principalAzul p-4 flex flex-col items-center relative">
       {/* Encabezado */}
       <Header />
       <FormRegister />
    </div>
  );
};

export default Register;
