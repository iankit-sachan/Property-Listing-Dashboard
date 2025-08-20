import React from 'react';
import { MapPin, Bed, Bath, Square, Eye } from 'lucide-react';
import { Property } from '../types';
import { usePropertyContext } from '../context/PropertyContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { setSelectedProperty, setIsModalOpen } = usePropertyContext();

  const handleViewDetails = () => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const capitalizeType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
            {capitalizeType(property.type)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{property.description}</p>

        {/* Property Stats */}
        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.bedrooms} bed</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.bathrooms} bath</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.area} sqft</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </div>
          
          <button
            onClick={handleViewDetails}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;