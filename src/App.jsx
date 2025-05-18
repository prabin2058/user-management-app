// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import CreateUser from './pages/CreateUser';
import UserDetail from './pages/UserDetail';
import EditUser from './pages/EditUser';
import Login from './pages/Login';
import React from 'react';
import { Layout } from 'antd';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Header from './components/Header';

const { Content, Footer } = Layout;

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Layout className="min-h-screen">
            <Header />
            <Content className="p-4 bg-gray-50">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <UserList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/create"
                  element={
                    <PrivateRoute>
                      <CreateUser />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/view/:userId"
                  element={
                    <PrivateRoute>
                      <UserDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/update/:userId"
                  element={
                    <PrivateRoute>
                      <EditUser />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Content>
            <Footer className="text-center bg-white">
              User Management System ©2023
            </Footer>
          </Layout>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;