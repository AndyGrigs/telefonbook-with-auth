// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto px-4">
      <LoginForm />
      <p className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:text-blue-800">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
