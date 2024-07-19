import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import paths from "../config/routePaths";
import { Contexto } from '../context/Contexto';

export default function ProtectedRoute({ component: Component, userComponent: UserComponent, adminComponent: AdminComponent }) {
  const navigate = useNavigate();
  const { user } = useContext(Contexto)
  const location = useLocation(); // Obtener la información de la ubicación actual
  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    // Si el usuario está logueado no se permite que entre al login o register
    if (user && (currentPath == paths.LOGIN_PATH || currentPath == paths.REGISTER_PATH)) return navigate(paths.DASHBOARD_PATH);

    // Si el usuario no está logueado se redirige al login o register
    if (user === null){
      if(currentPath == paths.REGISTER_PATH) return navigate(paths.REGISTER_PATH);
      return navigate(paths.REGISTER_PATH);
    } 
  }, []);

  return (
    <>
      {user === null ? (<></>) : (user.role === "admin_principal" ? (
        <AdminComponent />
      ) : (
        <></>
      ))}
    </>
  );
};