import {
  Form,
  Input,
  Select,
  Button,
  message,
  Card,
  Typography
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const { Option } = Select;
const { Title } = Typography;

const UserForm = ({ initialValues, onFinish, isEdit = false }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please correct the errors in the form!');
  };

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
    <Card className="max-w-2xl mx-auto mt-10 shadow-xl rounded-2xl p-8" bordered>
      <Title level={3} className="text-center mb-6">
        {isEdit ? 'Edit User' : 'Create New User'}
      </Title>

      <Form
        form={form}
        name="userForm"
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        validateTrigger={['onChange', 'onBlur']}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true }, { validator: validateName }]}
            hasFeedback
          >
            <Input
              placeholder="Enter first name"
              prefix={<UserOutlined />}
              maxLength={50}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true }, { validator: validateName }]}
            hasFeedback
          >
            <Input
              placeholder="Enter last name"
              prefix={<UserOutlined />}
              maxLength={50}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true }, { validator: validateUsername }]}
          hasFeedback
          tooltip="4-20 characters, letters, numbers and underscores only"
        >
          <Input
            placeholder="Enter username"
            prefix={<TeamOutlined />}
            maxLength={20}
          />
        </Form.Item>

        <Form.Item
          label="User Type"
          name="userType"
          rules={[{ required: true, message: 'Please select user type!' }]}
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
          rules={[{ required: true, message: 'Please select department!' }]}
          hasFeedback
        >
          <Select placeholder="Select department" suffixIcon={<ApartmentOutlined />}>
            <Option value="Frontend">Frontend</Option>
            <Option value="Backend">Backend</Option>
            <Option value="QA">QA</Option>
            <Option value="Marketing">Marketing</Option>
          </Select>
        </Form.Item>

        <Form.Item className="text-center mt-6">
          <Button
            type="primary"
            htmlType="submit"
            className="mr-4"
            size="large"
            style={{ width: 140 }}
          >
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button
            onClick={() => navigate('/')}
            size="large"
            style={{ width: 140 }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm;
