import React, { useState } from 'react';
import { Bed, Bath, Square, MapPin, Calendar, Eye, Heart } from 'lucide-react';
import { Property } from '../types';
import { useAppContext } from '../context/AppContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isDarkMode, setSelectedProperty, setIsModalOpen } = useAppContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleViewDetails = () => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className={`group relative rounded-xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/50' 
        : 'bg-white border-gray-200 hover:shadow-gray-200/50'
    }`}>
      {/* Status Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          property.isAvailable
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          {property.isAvailable ? 'Available' : 'Sold'}
        </span>
      </div>

      {/* Like Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
          isLiked
            ? 'bg-red-500 text-white'
            : isDarkMode
            ? 'bg-gray-800/80 text-white hover:bg-gray-700'
            : 'bg-white/80 text-gray-600 hover:bg-white'
        }`}
      >
        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
      </button>

      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';
          }}
        />
        
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            >
              →
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6" onClick={handleViewDetails}>
        <div className="flex items-start justify-between mb-3">
          <h3 className={`text-xl font-bold leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {property.title}
          </h3>
          <span className={`text-2xl font-bold ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {formatPrice(property.price)}
          </span>
        </div>

        <div className={`flex items-center mb-3 text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>

        <p className={`text-sm mb-4 line-clamp-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {property.description}
        </p>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
            </div>
            <div className={`flex items-center text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
            </div>
            <div className={`flex items-center text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <Square className="h-4 w-4 mr-1" />
              {property.sqft.toLocaleString()} sq ft
            </div>
          </div>
        </div>

        {/* Property Type & Year */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
            isDarkMode
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {property.type}
          </span>
          <div className={`flex items-center text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Calendar className="h-3 w-3 mr-1" />
            Built {property.yearBuilt}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                  isDarkMode
                    ? 'bg-blue-900/50 text-blue-300'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;