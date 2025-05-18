import { Table, Button, Tag, Space, Input } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const UserTable = ({ users, onDelete }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search username"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
        </div>
      ),
      filterIcon: filtered => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'User Type',
      dataIndex: 'userType',
      key: 'userType',
      render: (userType) => (
        <Tag 
          color={userType === 'Admin User' ? 'green' : 'gold'}
          style={{
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '4px'
          }}
        >
          {userType}
        </Tag>
      ),
      filters: [
        { text: 'Admin User', value: 'Admin User' },
        { text: 'System User', value: 'System User' },
      ],
      onFilter: (value, record) => record.userType === value,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: [
        { text: 'Frontend', value: 'Frontend' },
        { text: 'Backend', value: 'Backend' },
        { text: 'QA', value: 'QA' },
        { text: 'Marketing', value: 'Marketing' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => navigate(`/user/view/${record.id}`)}
            className="bg-blue-50 text-blue-600"
          >
            View
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => navigate(`/user/update/${record.id}`)}
            className="bg-green-50 text-green-600"
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(record.id)}
            className="hover:bg-red-50"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-gray-500 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by username"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          allowClear
        />
      </div>
      <Table 
        columns={columns} 
        dataSource={filteredUsers} 
        rowKey="id"
        scroll={{ x: 1300 }}
        bordered
        pagination={{
          pageSizeOptions: ['5', '10', '20', '50'],
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
};

export default UserTable;