import { createContext, useEffect, useState } from "react";

export const Contexto = createContext()

export function ContextoProvider(props) {

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  
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

  return (
    <Contexto.Provider value={{
      token,
      setToken,
      peticionPost,
      setUser,
      user
    }}>
      {props.children}
    </Contexto.Provider>
  )
}