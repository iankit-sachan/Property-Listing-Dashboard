import React from 'react';
import { X, MapPin, Bed, Bath, Square, Phone, Calendar } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';

const PropertyModal: React.FC = () => {
  const { selectedProperty, isModalOpen, setIsModalOpen, setSelectedProperty } = usePropertyContext();

  if (!isModalOpen || !selectedProperty) return null;

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.name}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div>
              <img
                src={selectedProperty.image}
                alt={selectedProperty.name}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
            </div>

            {/* Details */}
            <div>
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {capitalizeType(selectedProperty.type)}
                </span>
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-4">
                {formatPrice(selectedProperty.price)}
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{selectedProperty.location}</span>
              </div>

              {/* Property Stats */}
              {(selectedProperty.bedrooms || selectedProperty.bathrooms || selectedProperty.area) && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedProperty.bedrooms && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <div className="text-lg font-semibold text-gray-900">{selectedProperty.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  )}
                  {selectedProperty.bathrooms && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Bath className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <div className="text-lg font-semibold text-gray-900">{selectedProperty.bathrooms}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                  )}
                  {selectedProperty.area && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Square className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <div className="text-lg font-semibold text-gray-900">{selectedProperty.area}</div>
                      <div className="text-sm text-gray-600">Sq Ft</div>
                    </div>
                  )}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProperty.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Agent
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Calendar className="w-5 h-5 mr-2" />
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