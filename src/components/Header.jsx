// src/components/Header.jsx
import { Layout, Dropdown, Button, Avatar, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const { Header } = Layout;

const AppHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success('Logged out successfully');
    navigate('/login');
  };

  const items = [
    {
      key: '1',
      label: (
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="w-full text-left"
        >
          Logout
        </Button>
      ),
    },
  ];

  return (
    <Header className="bg-blue-400 shadow-sm flex items-center justify-between px-6">
      <div className="text-xl font-bold text-blue-600">User Management</div>
      {user && (
        <Dropdown menu={{ items }} placement="bottomRight">
          <div className="flex items-center cursor-pointer">
            <Avatar
              icon={<UserOutlined />}
              className="bg-blue-100 text-blue-600"
            />
            <span className="ml-2 font-medium">{user.username}</span>
          </div>
        </Dropdown>
      )}
    </Header>
  );
};

export default AppHeader;