import { createContext, useEffect, useState } from "react";

export const Contexto = createContext()

export function ContextoProvider(props) {

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [departmentsData, setDepartmentsData] = useState([])
  const [positionsData, setPositionsData] = useState([])
  const [employeesData, setEmployeesData] = useState([])
  const [perceptionsData, setPerceptionsData] = useState([])
  const [deductionsData, setDeductionsData] = useState([])
  const [banksData, setBanksData] = useState([])
  const [banksAcountsData, setBanksAcountsData] = useState([])
  const [attendances, setAttendances] = useState([])
  
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

  const realizarPeticion = async () => {
    const positions = await peticionGet(
      "http://localhost:3000/api/positions/all",
      "GET"
    );
    const employees = await peticionGet(
      "http://localhost:3000/api/employees/all",
      "GET"
    );
    const banks = await peticionGet(
      "http://localhost:3000/api/banks/all",
      "GET"
    );
    const banksAccount = await peticionGet(
      "http://localhost:3000/api/banks_accounts/all",
      "GET"
    );
    const perceptions = await peticionGet(
      "http://localhost:3000/api/perceptions/all",
      "GET"
    );
    const deductions = await peticionGet(
      "http://localhost:3000/api/deductions/all",
      "GET"
    );
    const departments = await peticionGet(
      "http://localhost:3000/api/departments/all",
      "GET"
    );
    banksAccount.forEach(item => {
      banks.forEach(bank => {
        if (bank._id === item.bank_id) {
          item.bank = bank.name
        }
      });
    });
    employees.forEach(item => {
      positions.forEach(element => {
        if (element._id === item.position_id) {
          item.position = element.name
        }
      });
      departments.forEach(element => {
        if (element._id === item.department_id) {
          item.department = element.name
        }
      });
    });
    setEmployeesData(employees)
    setPositionsData(positions);
    setBanksData(banks);
    setBanksAcountsData(banksAccount);
    setPerceptionsData(perceptions);
    setDeductionsData(deductions)
    setDepartmentsData(departments)
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
      setPositionsData,
      employeesData,
      setEmployeesData,
      perceptionsData,
      setPerceptionsData,
      deductionsData,
      setDeductionsData,
      banksData,
      setBanksData,
      banksAcountsData,
      setBanksAcountsData,
      attendances,
      setAttendances,
      realizarPeticion
    }}>
      {props.children}
    </Contexto.Provider>
  )
}