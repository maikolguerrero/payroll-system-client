import { createContext, useEffect, useState } from "react";

export const Contexto = createContext()

export function ContextoProvider(props) {

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [departmentsData, setDepartmentsData] = useState([])
  const [positionsData, setPositionsData] = useState([])
  
  const peticionPost = async (url, metodo, contenido) => {
    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(contenido)
      })
  
      if (!response.ok) {
        const { error } = await response.json();
        return { error };
      }
      
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const peticionGet = async (url, metodo) => {
    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization": `Bearer ${token}`,
        },
      })
  
      if (!response.ok) {
        const { error } = await response.json();
        return { error };
      }
      
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const peticionDelete = async (url, metodo) => {
    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization": `Bearer ${token}`,
        },
      })
  
      if (!response.ok) {
        const { error } = await response.json();
        return { error };
      }
      
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Contexto.Provider value={{
      token,
      setToken,
      peticionPost,
      peticionGet,
      setUser,
      user,
      setUsers,
      users,
      peticionDelete,
      departmentsData,
      setDepartmentsData,
      positionsData,
      setPositionsData
    }}>
      {props.children}
    </Contexto.Provider>
  )
}