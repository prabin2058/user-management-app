// src/pages/EditUser.jsx
import { useContext } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const EditUser = () => {
  const { userId } = useParams();
  const { users, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const user = users.find(u => u.id === parseInt(userId));

  const handleSubmit = async (values) => {
    try {
      updateUser(parseInt(userId), values);
      message.success('User updated successfully');
      navigate(`/user/view/${userId}`);
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user');
    }
  };

  if (!user) return <div>User not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <UserForm 
        initialValues={user} 
        onFinish={handleSubmit} 
        isEdit={true}
      />
    </div>
  );
};

export default EditUser;