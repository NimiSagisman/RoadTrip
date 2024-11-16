import React from 'react';
import { X } from 'lucide-react';
import type { SearchFilters as SearchFiltersType } from '../types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (filters: SearchFiltersType) => void;
  onClose: () => void;
}

const categories = [
  'Landmarks',
  'Restaurants',
  'Museums',
  'Activities',
  'Shopping',
  'Events',
  'Tours',
  'Nightlife'
];

export function SearchFilters({ filters, onFilterChange, onClose }: SearchFiltersProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filters.categories.includes(category)
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  categories: filters.categories.includes(category)
                    ? filters.categories.filter((c) => c !== category)
                    : [...filters.categories, category],
                })
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
        <div className="grid grid-cols-4 gap-2">
          {['$', '$$', '$$$', '$$$$'].map((price) => (
            <button
              key={price}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filters.priceRange[0] === price
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  priceRange: [price, filters.priceRange[1]],
                })
              }
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rating</h3>
        <div className="flex gap-2">
          {[4, 4.5].map((rating) => (
            <button
              key={rating}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filters.rating === rating
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  rating: filters.rating === rating ? 0 : rating,
                })
              }
            >
              {rating}+ Stars
            </button>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            onFilterChange({
              query: '',
              categories: [],
              priceRange: [0, 1000],
              rating: 0,
              duration: '',
            });
          }}
          className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}