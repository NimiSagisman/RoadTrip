export interface Experience {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  rating: number;
  categories: string[];
  price: {
    value: number;
    currency: string;
  };
  duration: string;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  priceRange: [string | number, number];
  rating: number;
  duration: string;
}