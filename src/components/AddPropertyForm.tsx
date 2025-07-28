import React, { useState } from 'react';
import { X, Upload, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Property } from '../types';

const AddPropertyForm: React.FC = () => {
  const { isDarkMode, isAddFormOpen, setIsAddFormOpen, addProperty } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'house' as Property['type'],
    bedrooms: 1,
    bathrooms: 1,
    sqft: '',
    images: [''],
    features: [''],
    yearBuilt: new Date().getFullYear(),
    isAvailable: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isAddFormOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.sqft || Number(formData.sqft) <= 0) newErrors.sqft = 'Valid square footage is required';
    if (formData.yearBuilt < 1800 || formData.yearBuilt > new Date().getFullYear() + 5) {
      newErrors.yearBuilt = 'Valid year is required';
    }

    const validImages = formData.images.filter(img => img.trim());
    if (validImages.length === 0) newErrors.images = 'At least one image URL is required';

    const validFeatures = formData.features.filter(feature => feature.trim());
    if (validFeatures.length === 0) newErrors.features = 'At least one feature is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const propertyData = {
      ...formData,
      price: Number(formData.price),
      sqft: Number(formData.sqft),
      images: formData.images.filter(img => img.trim()),
      features: formData.features.filter(feature => feature.trim())
    };

    addProperty(propertyData);
    setIsAddFormOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      type: 'house',
      bedrooms: 1,
      bathrooms: 1,
      sqft: '',
      images: [''],
      features: [''],
      yearBuilt: new Date().getFullYear(),
      isAvailable: true
    });
    setErrors({});
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImageField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeatureField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeatureField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
          onClick={() => setIsAddFormOpen(false)}
        />

        {/* Modal */}
        <div className={`inline-block align-bottom rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Add New Property
            </h2>
            <button
              onClick={() => setIsAddFormOpen(false)}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Property Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${errors.title ? 'border-red-500' : ''}`}
                  placeholder="Enter property title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe the property"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Price */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Price ($) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${errors.price ? 'border-red-500' : ''}`}
                  placeholder="0"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              {/* Location */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${errors.location ? 'border-red-500' : ''}`}
                  placeholder="City, State"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              {/* Property Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Property Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Property['type'] }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>

              {/* Square Footage */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Square Footage *
                </label>
                <input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData(prev => ({ ...prev, sqft: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${errors.sqft ? 'border-red-500' : ''}`}
                  placeholder="0"
                />
                {errors.sqft && <p className="text-red-500 text-sm mt-1">{errors.sqft}</p>}
              </div>

              {/* Bedrooms */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: Number(e.target.value) }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Year Built */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Year Built
                </label>
                <input
                  type="number"
                  min="1800"
                  max={new Date().getFullYear() + 5}
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearBuilt: Number(e.target.value) }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.yearBuilt ? 'border-red-500' : ''}`}
                />
                {errors.yearBuilt && <p className="text-red-500 text-sm mt-1">{errors.yearBuilt}</p>}
              </div>

              {/* Images */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Image URLs *
                </label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => updateImageField(index, e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className={`p-2 rounded text-red-500 hover:bg-red-50 ${
                          isDarkMode ? 'hover:bg-red-900/20' : ''
                        }`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isDarkMode
                      ? 'text-blue-400 hover:bg-gray-800'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Image
                </button>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
              </div>

              {/* Features */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Features *
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeatureField(index, e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g., Hardwood Floors"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeatureField(index)}
                        className={`p-2 rounded text-red-500 hover:bg-red-50 ${
                          isDarkMode ? 'hover:bg-red-900/20' : ''
                        }`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeatureField}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isDarkMode
                      ? 'text-blue-400 hover:bg-gray-800'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
                {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features}</p>}
              </div>

              {/* Availability */}
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isAvailable" className={`ml-2 text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Property is available for sale
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setIsAddFormOpen(false)}
                className={`px-6 py-2 border rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyForm;