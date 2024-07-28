import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import paths from "../config/routePaths";
import { Contexto } from '../context/Contexto';

export default function ProtectedRoute({ defaultComponent: DefaultComponent, userComponent: UserComponent, adminComponent: AdminComponent }) {
  const navigate = useNavigate();
  const { user, setUser, verificarAdmin, admins, verificarCompany, company } = useContext(Contexto);
  const location = useLocation(); // Obtener la información de la ubicación actual
  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (token && storedUser) {
        setUser(storedUser);
      }

      let count = await verificarAdmin();
      let empresa = await verificarCompany();

      if (count == 0) {
        return navigate(paths.REGISTER_PATH);
      }

      if (count > 0 && user === null) {
        return navigate(paths.LOGIN_PATH);
      }

      if (user && empresa.length === 0) {
        return navigate(paths.COMPANY_REGISTER_PATH);
      }

      if (user && (currentPath === paths.LOGIN_PATH || currentPath === paths.REGISTER_PATH)) {
        return navigate(paths.DASHBOARD_PATH);
      }

      if (user === null) {
        if (currentPath === paths.REGISTER_PATH) return navigate(paths.REGISTER_PATH);
        return navigate(paths.LOGIN_PATH);
      }
    };
    load();
  }, [currentPath, navigate]);

  return (
    <>
      {user === null ? (<></>) : (user.role === "admin_principal" ? (
        <AdminComponent />
      ) : (
        <>
          <UserComponent />
        </>

      ))}
      <DefaultComponent />
    </>
  );
};
