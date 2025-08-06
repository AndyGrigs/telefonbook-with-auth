// src/components/Navigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../redux/auth/authSelectors';
import { logout } from '../redux/auth/authOperations';

const Navigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex items-center space-x-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
          }`
        }
      >
        Home
      </NavLink>
      
      {isLoggedIn ? (
        <>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`
            }
          >
            Contacts
          </NavLink>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Welcome, {user.name}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="flex space-x-2">
          <NavLink
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
