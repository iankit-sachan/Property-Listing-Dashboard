import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';

const AddPropertyForm: React.FC = () => {
  const { isFormOpen, setIsFormOpen, addProperty } = usePropertyContext();
  const [formData, setFormData] = useState({
    name: '',
    type: 'house' as 'house' | 'apartment' | 'condo' | 'commercial',
    price: '',
    location: '',
    description: '',
    image: '',
    bedrooms: '',
    bathrooms: '',
    area: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isFormOpen) return null;

  const handleClose = () => {
    setIsFormOpen(false);
    setFormData({
      name: '',
      type: 'house',
      price: '',
      location: '',
      description: '',
      image: '',
      bedrooms: '',
      bathrooms: '',
      area: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }

    if (formData.bedrooms && isNaN(Number(formData.bedrooms))) {
      newErrors.bedrooms = 'Bedrooms must be a valid number';
    }

    if (formData.bathrooms && isNaN(Number(formData.bathrooms))) {
      newErrors.bathrooms = 'Bathrooms must be a valid number';
    }

    if (formData.area && isNaN(Number(formData.area))) {
      newErrors.area = 'Area must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const propertyData = {
      name: formData.name.trim(),
      type: formData.type,
      price: Number(formData.price),
      location: formData.location.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      ...(formData.bedrooms && { bedrooms: Number(formData.bedrooms) }),
      ...(formData.bathrooms && { bathrooms: Number(formData.bathrooms) }),
      ...(formData.area && { area: Number(formData.area) })
    };

    addProperty(propertyData);
    handleClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Property Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Property Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter property name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Property Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Property Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter price"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter location"
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter image URL"
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.bedrooms ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
              />
              {errors.bedrooms && <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>}
            </div>

            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.bathrooms ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                step="0.5"
              />
              {errors.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>}
            </div>

            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                Area (sq ft)
              </label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.area ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
              />
              {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter property description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;