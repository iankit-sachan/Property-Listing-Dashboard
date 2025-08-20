import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, PropertyContextType } from '../types';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within PropertyProvider');
  }
  return context;
};

const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Modern Downtown Apartment',
    type: 'apartment',
    price: 450000,
    location: 'Downtown, Seattle',
    description: 'Beautiful modern apartment with city views, hardwood floors, and updated kitchen.',
    image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200
  },
  {
    id: '2',
    name: 'Suburban Family House',
    type: 'house',
    price: 650000,
    location: 'Bellevue, WA',
    description: 'Spacious family home with large backyard, garage, and excellent school district.',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500
  },
  {
    id: '3',
    name: 'Luxury Waterfront Condo',
    type: 'condo',
    price: 850000,
    location: 'Kirkland, WA',
    description: 'Premium waterfront condo with panoramic lake views and resort-style amenities.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800
  },
  {
    id: '4',
    name: 'Commercial Office Space',
    type: 'commercial',
    price: 1200000,
    location: 'South Lake Union, Seattle',
    description: 'Prime commercial space perfect for tech companies, with modern amenities.',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    area: 5000
  }
];

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  // Load properties from localStorage or use mock data
  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      const parsed = JSON.parse(savedProperties);
      setProperties([...parsed, ...mockProperties]);
    } else {
      setProperties(mockProperties);
    }
  }, []);

  // Filter properties based on search and type filter
  useEffect(() => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter(property => property.type === filterType);
    }

    setFilteredProperties(filtered);
  }, [properties, searchTerm, filterType]);

  const addProperty = (propertyData: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString()
    };

    const updatedProperties = [newProperty, ...properties];
    setProperties(updatedProperties);

    // Save user-added properties to localStorage
    const userProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    userProperties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(userProperties));
  };

  const value: PropertyContextType = {
    properties,
    filteredProperties,
    selectedProperty,
    isModalOpen,
    isFormOpen,
    searchTerm,
    filterType,
    addProperty,
    setSelectedProperty,
    setIsModalOpen,
    setIsFormOpen,
    setSearchTerm,
    setFilterType
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};