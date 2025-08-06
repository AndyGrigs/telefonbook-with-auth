// src/pages/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto px-4">
      <RegisterForm />
      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-800">
          Sign in here
        </Link>
      </p>
    </div>
  );
};
