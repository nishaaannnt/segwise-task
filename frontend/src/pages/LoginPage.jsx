import React from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = async (credentials) => {
    const response = await login(credentials);
    console.log(response);
    localStorage.setItem('auth',response.token);
    navigate('/reviews')
  };

  return <AuthForm isLogin={true} onSubmit={handleLogin} />;
};

export default LoginPage;
