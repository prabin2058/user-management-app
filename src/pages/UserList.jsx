// src/pages/UserList.jsx
import { useContext } from 'react';
import React from 'react';
import { Button, Card, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import { UserContext } from '../context/UserContext';

const UserList = () => {
  const { users, deleteUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = (userId) => {
    deleteUser(userId);
    message.success('User deleted successfully');
  };

  return (
    <Card
      title="User List"
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/user/create')}
        >
          Add User
        </Button>
      }
    >
      <UserTable users={users} onDelete={handleDelete} />
    </Card>
  );
};

export default UserList;