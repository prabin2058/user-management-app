// src/pages/CreateUser.jsx
import { useContext, useState } from 'react';
import { message } from 'antd';
import React from 'react';
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addUser } = useContext(UserContext);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      addUser(values);
      message.success('User created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
      message.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Create New User</h1>
      <UserForm onFinish={handleSubmit} />
    </div>
  );
};

export default CreateUser;