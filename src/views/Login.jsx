import React from "react";
import Header from "../components/Header";
import FormLogin from "../components/forms/FormLogin";

const Login = () => {
  return (
    <div className="min-h-screen bg-principalAzul p-4 flex flex-col items-center relative">
      <Header />
      <FormLogin />
    </div>
  );
};

export default Login;
