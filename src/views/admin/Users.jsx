import React, { useState } from 'react';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';

const users = [
  { id: 1, username: "johndoe", name: "John Doe", password: "password123" },
  { id: 2, username: "janesmith", name: "Jane Smith", password: "password456" },
  { id: 3, username: "samjohnson", name: "Sam Johnson", password: "password789" },
];

const columns = [
  { label: "Username", accessor: "username" },
  { label: "Nombre", accessor: "name" },
  { label: "Contraseña", accessor: "password" },
];

export default function Users() {
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (query) => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-white font-bold mb-4 text-left">Usuarios</h1>
        <SearchBar placeholder="Buscar usuarios..." onSearch={handleSearch} />
        <Table columns={columns} data={filteredUsers} />
      </div>
    </>
  );
}