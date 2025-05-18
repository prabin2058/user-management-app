import { useState, useContext } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      if (values.username === 'admin1' && values.password === 'admin123') {
        login({ username: values.username });
        message.success('Login successful!');
        navigate('/');
      } else {
        message.error('Invalid credentials');
      }
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      className="max-w-md w-full"
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: 'Please input your username!' },
          { min: 4, message: 'Username must be at least 4 characters' }
        ]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="Username"
          className="h-10"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Password"
          className="h-10"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a className="float-right" href="#">
          Forgot password?
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full h-10"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;