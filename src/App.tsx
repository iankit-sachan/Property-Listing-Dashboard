import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import SearchAndFilters from './components/SearchAndFilters';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import AddPropertyForm from './components/AddPropertyForm';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent: React.FC = () => {
  const { isDarkMode, filteredProperties, isLoading } = useAppContext();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header />
      <SearchAndFilters />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className={`text-6xl mb-4 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-300'
            }`}>
              🏠
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              No Properties Found
            </h3>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Try adjusting your search criteria or add a new property
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t mt-16 ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Built with ❤️ by{' '}
              <a
                href="https://github.com/iankit-sachan"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Ankit Sachan
              </a>
              {' • '}
              <a
                href="https://github.com/iankit-sachan/property-listing-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                View Source
              </a>
            </p>
          </div>
        </div>
      </footer>

      <PropertyModal />
      <AddPropertyForm />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;