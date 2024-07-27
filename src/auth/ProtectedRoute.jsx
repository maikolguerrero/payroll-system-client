import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import paths from "../config/routePaths";
import { Contexto } from '../context/Contexto';

export default function ProtectedRoute({ component: Component, userComponent: UserComponent, adminComponent: AdminComponent }) {
  const navigate = useNavigate();
  const { user, verificarAdmin, admins, verificarCompany, company } = useContext(Contexto)
  const location = useLocation(); // Obtener la información de la ubicación actual
  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    const load = async () => {
      let data = await verificarAdmin()
      let empresa = await verificarCompany()

    if (data > 0 && user === null) {
      return navigate(paths.LOGIN_PATH)
    }

    if (user && empresa.length === 0) {
      return navigate(paths.COMPANY_REGISTER_PATH)
  }

    // Si el usuario está logueado no se permite que entre al login o register
    if (user && (currentPath == paths.LOGIN_PATH || currentPath == paths.REGISTER_PATH)) return navigate(paths.DASHBOARD_PATH);

    // Si el usuario no está logueado se redirige al login o register
    if (user === null){
      if(currentPath == paths.REGISTER_PATH) return navigate(paths.REGISTER_PATH);
      return navigate(paths.REGISTER_PATH);
    }
    } 
    load()
  }, []);

  useEffect(() => {
    if (admins === 0) {
      navigate(paths.LOGIN_PATH)
    }
  }, [admins]);

  return (
    <>
      {user === null ? (<></>) : (user.role === "admin_principal" ? (
        <AdminComponent />
      ) : (
        <UserComponent />
      ))}
    </>
  );
};