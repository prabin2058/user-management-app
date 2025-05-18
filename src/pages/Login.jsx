// src/pages/Login.jsx
import { Card, Divider, Typography } from 'antd';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        <div className="text-center mb-6">
          <Title level={3} className="mb-1">
            Welcome Back
          </Title>
          <p className="text-gray-500">Sign in to your account</p>
        </div>
        
        <LoginForm />
        
        <Divider>or</Divider>
        
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a 
              onClick={() => navigate('/register')} 
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;