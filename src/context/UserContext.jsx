// src/context/UserContext.jsx
import { createContext, useState, useEffect } from 'react';
import React from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    // Load from localStorage if available
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      {
        id: 1,
        username: 'admin1',
        firstName: 'John',
        lastName: 'Doe',
        userType: 'Admin User',
        department: 'Frontend',
        email: 'admin1@example.com',
        password: 'admin123' 
      }
    ];
  });

  // Save to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { ...user, id: newId }]);
  };

  const updateUser = (id, updatedUser) => {
    setUsers(users.map(user => user.id === id ? { ...updatedUser, id } : user));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};