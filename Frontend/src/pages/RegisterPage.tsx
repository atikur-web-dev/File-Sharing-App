import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/login', { 
      state: { message: 'Registration successful! Please check your email to verify your account.' } 
    });
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-linear-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onLoginClick={handleLoginClick}
        />
      </div>
    </div>
  );
};