import React, { useState } from 'react';
import { X, Bed, Bath, Square, MapPin, Calendar, Star, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PropertyModal: React.FC = () => {
  const { isDarkMode, selectedProperty, isModalOpen, setIsModalOpen } = useAppContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!isModalOpen || !selectedProperty) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProperty.images.length - 1 : prev - 1
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
          onClick={closeModal}
        />

        {/* Modal */}
        <div className={`inline-block align-bottom rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div>
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {selectedProperty.title}
              </h2>
              <div className={`flex items-center mt-1 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <MapPin className="h-4 w-4 mr-1" />
                {selectedProperty.location}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isLiked
                    ? 'bg-red-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={closeModal}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isDarkMode
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="lg:w-1/2">
              <div className="relative h-96 lg:h-[600px]">
                <img
                  src={selectedProperty.images[currentImageIndex]}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';
                  }}
                />
                
                {selectedProperty.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedProperty.isAvailable
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {selectedProperty.isAvailable ? 'Available' : 'Sold'}
                  </span>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                  {currentImageIndex + 1} / {selectedProperty.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {selectedProperty.images.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto">
                  {selectedProperty.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-blue-500'
                          : isDarkMode
                          ? 'border-gray-700 hover:border-gray-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${selectedProperty.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="lg:w-1/2 p-6">
              {/* Price */}
              <div className="mb-6">
                <div className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {formatPrice(selectedProperty.price)}
                </div>
                <div className={`flex items-center space-x-4 text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-1" />
                    {selectedProperty.bedrooms} bed{selectedProperty.bedrooms !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-1" />
                    {selectedProperty.bathrooms} bath{selectedProperty.bathrooms !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-1" />
                    {selectedProperty.sqft.toLocaleString()} sq ft
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  About This Property
                </h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {selectedProperty.description}
                </p>
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Property Type
                  </div>
                  <div className={`font-semibold capitalize ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedProperty.type}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Year Built
                  </div>
                  <div className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedProperty.yearBuilt}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProperty.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded ${
                        isDarkMode
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  Contact Agent
                </button>
                <button className={`w-full py-3 px-4 rounded-lg font-semibold border transition-all duration-200 hover:shadow-md ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  Schedule Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;