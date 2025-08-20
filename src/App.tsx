import React from 'react';
import { PropertyProvider, usePropertyContext } from './context/PropertyContext';
import Header from './components/Header';
import SearchAndFilters from './components/SearchAndFilters';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import AddPropertyForm from './components/AddPropertyForm';

const AppContent: React.FC = () => {
  const { filteredProperties } = usePropertyContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchAndFilters />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 text-gray-300">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Properties Found
            </h3>
            <p className="text-lg text-gray-600">
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

      <PropertyModal />
      <AddPropertyForm />
    </div>
  );
};

function App() {
  return (
    <PropertyProvider>
      <AppContent />
    </PropertyProvider>
  );
}

export default App;