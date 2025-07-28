export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  features: string[];
  yearBuilt: number;
  isAvailable: boolean;
  createdAt: string;
}

export interface FilterOptions {
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
}

export interface AppContextType {
  properties: Property[];
  filteredProperties: Property[];
  isDarkMode: boolean;
  searchTerm: string;
  filters: FilterOptions;
  isLoading: boolean;
  selectedProperty: Property | null;
  isModalOpen: boolean;
  isAddFormOpen: boolean;
  setProperties: (properties: Property[]) => void;
  setFilteredProperties: (properties: Property[]) => void;
  toggleDarkMode: () => void;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: FilterOptions) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedProperty: (property: Property | null) => void;
  setIsModalOpen: (open: boolean) => void;
  setIsAddFormOpen: (open: boolean) => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
}