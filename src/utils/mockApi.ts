import { Property } from '../types';

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    description: 'Stunning modern loft in the heart of downtown with floor-to-ceiling windows, exposed brick walls, and premium finishes throughout.',
    price: 850000,
    location: 'Downtown, Seattle, WA',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ],
    features: ['City Views', 'Hardwood Floors', 'Stainless Steel Appliances', 'In-Unit Laundry', 'Gym Access'],
    yearBuilt: 2018,
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Luxury Suburban Home',
    description: 'Spacious family home in prestigious neighborhood featuring gourmet kitchen, master suite, and beautifully landscaped grounds.',
    price: 1250000,
    location: 'Bellevue, WA',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg'
    ],
    features: ['Two-Car Garage', 'Fireplace', 'Updated Kitchen', 'Large Backyard', 'Walk-in Closets'],
    yearBuilt: 2015,
    isAvailable: true,
    createdAt: '2024-01-12T14:30:00Z'
  },
  {
    id: '3',
    title: 'Waterfront Condo',
    description: 'Beautiful waterfront condominium with panoramic views, private balcony, and resort-style amenities.',
    price: 675000,
    location: 'Kirkland, WA',
    type: 'condo',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg'
    ],
    features: ['Water Views', 'Balcony', 'Pool Access', 'Concierge', 'Parking'],
    yearBuilt: 2020,
    isAvailable: true,
    createdAt: '2024-01-10T09:15:00Z'
  },
  {
    id: '4',
    title: 'Historic Townhouse',
    description: 'Charming historic townhouse completely renovated with modern amenities while preserving original character.',
    price: 950000,
    location: 'Capitol Hill, Seattle, WA',
    type: 'townhouse',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
      'https://images.pexels.com/photos/2121123/pexels-photo-2121123.jpeg',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg'
    ],
    features: ['Original Hardwood', 'Renovated Kitchen', 'Private Patio', 'Storage', 'Historic Charm'],
    yearBuilt: 1925,
    isAvailable: false,
    createdAt: '2024-01-08T16:45:00Z'
  },
  {
    id: '5',
    title: 'New Construction Home',
    description: 'Brand new single-family home with smart home technology, energy-efficient features, and modern design.',
    price: 1100000,
    location: 'Redmond, WA',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    images: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg'
    ],
    features: ['Smart Home Tech', 'Energy Efficient', 'Open Floor Plan', 'Two-Car Garage', 'New Construction'],
    yearBuilt: 2024,
    isAvailable: true,
    createdAt: '2024-01-05T11:20:00Z'
  },
  {
    id: '6',
    title: 'Cozy Studio Apartment',
    description: 'Efficient studio apartment perfect for urban living, featuring modern finishes and great location.',
    price: 425000,
    location: 'Fremont, Seattle, WA',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    images: [
      'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
      'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
    ],
    features: ['Murphy Bed', 'Efficient Layout', 'Great Location', 'Transit Access', 'Pet Friendly'],
    yearBuilt: 2019,
    isAvailable: true,
    createdAt: '2024-01-03T13:10:00Z'
  }
];

export const fetchProperties = (): Promise<Property[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockProperties);
    }, 1500);
  });
};