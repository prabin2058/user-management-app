// src/pages/UserDetail.jsx
import { useContext } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserDetail = () => {
  const { userId } = useParams();
  const { users } = useContext(UserContext);
  const navigate = useNavigate();

  const user = users.find(u => u.id === parseInt(userId));

  if (!user) return <div>User not found</div>;

  return (
    <div className="p-4">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Back
      </Button>
      
      <Card title="User Details">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
          <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
          <Descriptions.Item label="User Type">
            <span className={user.userType === 'Admin User' ? 'admin-user' : 'system-user'}>
              {user.userType}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Department">{user.department}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default UserDetail;