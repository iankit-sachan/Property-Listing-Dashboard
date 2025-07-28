import React from 'react';
import { Moon, Sun, Plus, Home, Github } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, setIsAddFormOpen } = useAppContext();

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/95 border-gray-800 backdrop-blur-md' 
        : 'bg-white/95 border-gray-200 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-blue-600' : 'bg-blue-600'
            }`}>
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Property Dashboard
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Find your perfect home
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAddFormOpen(true)}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </button>

            <a
              href="https://github.com/iankit-sachan/property-listing-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
              title="View on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;