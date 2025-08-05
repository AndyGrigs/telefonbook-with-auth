// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
      <div className="min-h-screen bg-gray-100">
        
         <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Phonebook</h1>
                        <Navigation />
                    </div>
            </div>
         </header>
       <main className="py-8">
          <Outlet />
       </main>
      </div>
    );
  };
 export default Layout;
