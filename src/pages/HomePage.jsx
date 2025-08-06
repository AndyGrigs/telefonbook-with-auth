import React from 'react';
import { BookOpen } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 p-6 rounded-full">
            <BookOpen className="h-16 w-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Phonebook
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Organize and manage your contacts easily. Sign up to get started or 
          log in to access your personal phonebook.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
