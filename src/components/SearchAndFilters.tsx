import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SearchAndFilters: React.FC = () => {
  const { 
    isDarkMode, 
    searchTerm, 
    setSearchTerm, 
    filters, 
    setFilters,
    filteredProperties,
    properties 
  } = useAppContext();

  const clearFilters = () => {
    setFilters({
      type: '',
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: 0,
      bathrooms: 0,
      location: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || filters.type || filters.minPrice > 0 || 
    filters.maxPrice < 10000000 || filters.bedrooms > 0 || filters.bathrooms > 0 || filters.location;

  return (
    <div className={`p-6 border-b transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Properties
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {filteredProperties.length} of {properties.length} properties
            </p>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search properties by title, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Property Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Min Price
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) || 0 })}
              className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Max Price
            </label>
            <input
              type="number"
              placeholder="No limit"
              value={filters.maxPrice === 10000000 ? '' : filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) || 10000000 })}
              className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Min Bedrooms
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({ ...filters, bedrooms: Number(e.target.value) })}
              className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Min Bathrooms
            </label>
            <select
              value={filters.bathrooms}
              onChange={(e) => setFilters({ ...filters, bathrooms: Number(e.target.value) })}
              className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;