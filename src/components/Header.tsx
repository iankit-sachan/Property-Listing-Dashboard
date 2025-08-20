import React from 'react';
import { Plus, Home } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';

const Header: React.FC = () => {
  const { setIsFormOpen } = usePropertyContext();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Home className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Property Dashboard</h1>
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Property
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;