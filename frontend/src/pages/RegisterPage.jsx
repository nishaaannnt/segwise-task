import React from 'react';
import AuthForm from '../components/AuthForm';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleRegister = async (credentials) => {
    const response = await register(credentials);
    console.log(response);
    navigate('/login')
  };

  return <AuthForm isLogin={false} onSubmit={handleRegister} />;
};

export default RegisterPage;
