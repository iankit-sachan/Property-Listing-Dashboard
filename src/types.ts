export interface Property {
  id: string;
  name: string;
  type: 'house' | 'apartment' | 'condo' | 'commercial';
  price: number;
  location: string;
  description: string;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

export interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  selectedProperty: Property | null;
  isModalOpen: boolean;
  isFormOpen: boolean;
  searchTerm: string;
  filterType: string;
  addProperty: (property: Omit<Property, 'id'>) => void;
  setSelectedProperty: (property: Property | null) => void;
  setIsModalOpen: (open: boolean) => void;
  setIsFormOpen: (open: boolean) => void;
  setSearchTerm: (term: string) => void;
  setFilterType: (type: string) => void;
}