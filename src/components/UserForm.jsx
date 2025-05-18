import { Form, Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const { Option } = Select;

const UserForm = ({ initialValues, onFinish, isEdit = false }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please correct the errors in the form!');
  };

  // Custom validation for username (letters, numbers, underscores only)
  const validateUsername = (_, value) => {
    if (!value) return Promise.reject('Please input username!');
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('Only letters, numbers and underscores allowed!');
    }
    if (value.length < 4) {
      return Promise.reject('Username must be at least 4 characters!');
    }
    return Promise.resolve();
  };

  // Custom validation for names (letters and spaces only)
  const validateName = (_, value) => {
    if (!value) return Promise.reject('This field is required!');
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return Promise.reject('Only letters and spaces allowed!');
    }
    if (value.length < 2) {
      return Promise.reject('Must be at least 2 characters!');
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      name="userForm"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      className="max-w-2xl mx-auto"
      validateTrigger={['onChange', 'onBlur']} // Validate as user types and when leaving field
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          { required: true },
          { validator: validateName }
        ]}
        hasFeedback
      >
        <Input 
          placeholder="Enter first name" 
          maxLength={50}
        />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          { required: true },
          { validator: validateName }
        ]}
        hasFeedback
      >
        <Input 
          placeholder="Enter last name" 
          maxLength={50}
        />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true },
          { validator: validateUsername }
        ]}
        hasFeedback
        tooltip="4-20 characters, letters, numbers and underscores only"
      >
        <Input 
          placeholder="Enter username" 
          maxLength={20}
          minLength={4}
        />
      </Form.Item>

      <Form.Item
        label="User Type"
        name="userType"
        rules={[{ 
          required: true, 
          message: 'Please select user type!' 
        }]}
        hasFeedback
      >
        <Select placeholder="Select user type">
          <Option value="Admin User">Admin User</Option>
          <Option value="System User">System User</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Department"
        name="department"
        rules={[{ 
          required: true, 
          message: 'Please select department!' 
        }]}
        hasFeedback
      >
        <Select placeholder="Select department">
          <Option value="Frontend">Frontend</Option>
          <Option value="Backend">Backend</Option>
          <Option value="QA">QA</Option>
          <Option value="Marketing">Marketing</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="mr-4"
          style={{ width: 120 }}
        >
          {isEdit ? 'Update' : 'Create'}
        </Button>
        <Button 
          onClick={() => navigate('/')}
          style={{ width: 120 }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;