import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, FilterOptions, AppContextType } from '../types';
import { fetchProperties } from '../utils/mockApi';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    type: '',
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 0,
    bathrooms: 0,
    location: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', String(!isDarkMode));
  };

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedProperties = [newProperty, ...properties];
    setProperties(updatedProperties);
    localStorage.setItem('localProperties', JSON.stringify([newProperty]));
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }

    const loadProperties = async () => {
      try {
        const mockProperties = await fetchProperties();
        const localProperties = JSON.parse(localStorage.getItem('localProperties') || '[]');
        const allProperties = [...localProperties, ...mockProperties];
        setProperties(allProperties);
        setFilteredProperties(allProperties);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }
    if (filters.minPrice > 0) {
      filtered = filtered.filter(property => property.price >= filters.minPrice);
    }
    if (filters.maxPrice < 10000000) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice);
    }
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms);
    }
    if (filters.bathrooms > 0) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathrooms);
    }
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  }, [properties, searchTerm, filters]);

  const value: AppContextType = {
    properties,
    filteredProperties,
    isDarkMode,
    searchTerm,
    filters,
    isLoading,
    selectedProperty,
    isModalOpen,
    isAddFormOpen,
    setProperties,
    setFilteredProperties,
    toggleDarkMode,
    setSearchTerm,
    setFilters,
    setIsLoading,
    setSelectedProperty,
    setIsModalOpen,
    setIsAddFormOpen,
    addProperty
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};