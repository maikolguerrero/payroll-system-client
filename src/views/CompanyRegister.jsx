import React from "react";
import Header from "../components/Header";
import FormCompanyRegister from "../components/forms/FormCompanyRegister";

export default function CompanyRegister() {
  return (
    <div className="min-h-screen bg-principalAzul p-4 flex flex-col items-center relative">
      <Header />
      <FormCompanyRegister />
    </div>
  );
};