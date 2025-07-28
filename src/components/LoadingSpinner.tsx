import React from 'react';
import { useAppContext } from '../context/AppContext';

const LoadingSpinner: React.FC = () => {
  const { isDarkMode } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`animate-spin rounded-full h-16 w-16 border-4 ${
        isDarkMode 
          ? 'border-gray-700 border-t-blue-500' 
          : 'border-gray-200 border-t-blue-600'
      }`}></div>
      <p className={`mt-4 text-lg font-medium ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Loading properties...
      </p>
      <p className={`mt-2 text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Finding the perfect homes for you
      </p>
    </div>
  );
};

export default LoadingSpinner;