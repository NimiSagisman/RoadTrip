import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UtensilsCrossed, 
  Bed, 
  Compass,
  Building2,
  Train,
  Pill,
  Banknote,
  X
} from 'lucide-react';

interface CategoryItem {
  id: string;
  label: string;
}

interface Subcategory {
  id: string;
  label: string;
  items: CategoryItem[];
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  subcategories: Subcategory[];
}

interface MapCategoryFiltersProps {
  onFiltersChange: (filters: Record<string, boolean>) => void;
}

const categories: Category[] = [
  {
    id: 'restaurants',
    label: 'Restaurants',
    icon: UtensilsCrossed,
    subcategories: [
      {
        id: 'casual-dining',
        label: 'Casual Dining',
        items: [
          { id: 'italian', label: 'Italian' },
          { id: 'chinese', label: 'Chinese' },
          { id: 'mexican', label: 'Mexican' },
          { id: 'family-friendly', label: 'Family-Friendly' },
          { id: 'vegetarian', label: 'Vegetarian' }
        ]
      },
      {
        id: 'fine-dining',
        label: 'Fine Dining',
        items: [
          { id: 'michelin', label: 'Michelin Star' },
          { id: 'french', label: 'French Cuisine' },
          { id: 'contemporary', label: 'Contemporary' },
          { id: 'wine-bars', label: 'Wine Bars' },
          { id: 'tasting-menu', label: 'Tasting Menu' }
        ]
      },
      {
        id: 'fast-food',
        label: 'Fast Food',
        items: [
          { id: 'burgers', label: 'Burgers' },
          { id: 'pizza', label: 'Pizza' },
          { id: 'sandwiches', label: 'Sandwiches' },
          { id: 'asian', label: 'Asian' },
          { id: 'healthy', label: 'Healthy Options' }
        ]
      }
    ]
  },
  {
    id: 'accommodation',
    label: 'Accommodation',
    icon: Bed,
    subcategories: [
      {
        id: 'hotels',
        label: 'Hotels',
        items: [
          { id: 'luxury', label: 'Luxury' },
          { id: 'boutique', label: 'Boutique' },
          { id: 'business', label: 'Business' },
          { id: 'budget', label: 'Budget' },
          { id: 'family', label: 'Family-Friendly' }
        ]
      },
      {
        id: 'hostels',
        label: 'Hostels',
        items: [
          { id: 'party', label: 'Party Hostels' },
          { id: 'quiet', label: 'Quiet Hostels' },
          { id: 'female-only', label: 'Female Only' },
          { id: 'mixed', label: 'Mixed Dorms' },
          { id: 'private', label: 'Private Rooms' }
        ]
      },
      {
        id: 'vacation-rentals',
        label: 'Vacation Rentals',
        items: [
          { id: 'apartments', label: 'Apartments' },
          { id: 'houses', label: 'Houses' },
          { id: 'villas', label: 'Villas' },
          { id: 'unique', label: 'Unique Stays' },
          { id: 'groups', label: 'Group Stays' }
        ]
      }
    ]
  },
  {
    id: 'activities',
    label: 'Things to Do',
    icon: Compass,
    subcategories: [
      {
        id: 'outdoor',
        label: 'Outdoor Activities',
        items: [
          { id: 'walking', label: 'Walking Tours' },
          { id: 'biking', label: 'Biking' },
          { id: 'parks', label: 'Parks' },
          { id: 'gardens', label: 'Gardens' },
          { id: 'sports', label: 'Sports' }
        ]
      },
      {
        id: 'tours',
        label: 'Guided Tours',
        items: [
          { id: 'history', label: 'Historical' },
          { id: 'food', label: 'Food Tours' },
          { id: 'art', label: 'Art Tours' },
          { id: 'night', label: 'Night Tours' },
          { id: 'private', label: 'Private Tours' }
        ]
      }
    ]
  },
  {
    id: 'museums',
    label: 'Museums',
    icon: Building2,
    subcategories: [
      {
        id: 'art',
        label: 'Art Museums',
        items: [
          { id: 'modern', label: 'Modern Art' },
          { id: 'classical', label: 'Classical Art' },
          { id: 'contemporary', label: 'Contemporary' },
          { id: 'sculpture', label: 'Sculpture' },
          { id: 'photography', label: 'Photography' }
        ]
      },
      {
        id: 'history',
        label: 'History Museums',
        items: [
          { id: 'national', label: 'National History' },
          { id: 'war', label: 'War History' },
          { id: 'cultural', label: 'Cultural History' },
          { id: 'archaeological', label: 'Archaeological' },
          { id: 'maritime', label: 'Maritime' }
        ]
      }
    ]
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: Train,
    subcategories: [
      {
        id: 'public',
        label: 'Public Transport',
        items: [
          { id: 'metro', label: 'Metro' },
          { id: 'bus', label: 'Bus' },
          { id: 'train', label: 'Train' },
          { id: 'tram', label: 'Tram' },
          { id: 'ferry', label: 'Ferry' }
        ]
      },
      {
        id: 'rental',
        label: 'Rentals',
        items: [
          { id: 'car', label: 'Car Rental' },
          { id: 'bike', label: 'Bike Rental' },
          { id: 'scooter', label: 'Scooter Rental' },
          { id: 'luxury', label: 'Luxury Cars' },
          { id: 'van', label: 'Van Rental' }
        ]
      }
    ]
  },
  {
    id: 'pharmacies',
    label: 'Pharmacies',
    icon: Pill,
    subcategories: [
      {
        id: '24h',
        label: '24/7 Pharmacies',
        items: [
          { id: 'emergency', label: 'Emergency' },
          { id: 'night', label: 'Night Service' },
          { id: 'weekend', label: 'Weekend Open' }
        ]
      },
      {
        id: 'regular',
        label: 'Regular Hours',
        items: [
          { id: 'prescription', label: 'Prescription' },
          { id: 'otc', label: 'Over the Counter' },
          { id: 'wellness', label: 'Wellness' }
        ]
      }
    ]
  },
  {
    id: 'atms',
    label: 'ATMs',
    icon: Banknote,
    subcategories: [
      {
        id: 'bank',
        label: 'Bank ATMs',
        items: [
          { id: 'major-banks', label: 'Major Banks' },
          { id: 'international', label: 'International' },
          { id: 'local', label: 'Local Banks' }
        ]
      },
      {
        id: 'independent',
        label: 'Independent ATMs',
        items: [
          { id: '24h', label: '24/7 Access' },
          { id: 'shopping', label: 'Shopping Centers' },
          { id: 'tourist', label: 'Tourist Areas' }
        ]
      }
    ]
  }
];

export function MapCategoryFilters({ onFiltersChange }: MapCategoryFiltersProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({});

  const handleFilterChange = (itemId: string, checked: boolean) => {
    const newFilters = { ...selectedFilters, [itemId]: checked };
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFiltersChange({});
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10">
      {/* Clear All Button */}
      {Object.keys(selectedFilters).length > 0 && (
        <button
          onClick={clearAllFilters}
          className="mb-4 px-3 py-1 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-1 text-sm text-gray-600"
        >
          <X className="w-4 h-4" />
          Clear All
        </button>
      )}

      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => {
              if (!hoveredSubcategory) {
                setHoveredCategory(null);
              }
            }}
          >
            {/* Category Icon Button */}
            <button
              className={`p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow ${
                hoveredCategory === category.id ? 'bg-gray-50' : ''
              }`}
            >
              {React.createElement(category.icon, {
                className: 'w-6 h-6 text-gray-700',
              })}
            </button>

            {/* Subcategories Panel */}
            <AnimatePresence>
              {hoveredCategory === category.id && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute left-16 top-0 bg-white rounded-lg shadow-lg py-2 min-w-[200px]"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => {
                    if (!hoveredSubcategory) {
                      setHoveredCategory(null);
                    }
                  }}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-medium text-gray-900">{category.label}</h3>
                  </div>
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="relative"
                      onMouseEnter={() => setHoveredSubcategory(subcategory.id)}
                      onMouseLeave={() => setHoveredSubcategory(null)}
                    >
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                        {subcategory.label}
                      </button>

                      {/* Items Panel */}
                      <AnimatePresence>
                        {hoveredSubcategory === subcategory.id && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute left-full top-0 bg-white rounded-lg shadow-lg py-2 min-w-[200px]"
                          >
                            <div className="px-4 py-2 border-b border-gray-100">
                              <h4 className="font-medium text-gray-900">
                                {subcategory.label}
                              </h4>
                            </div>
                            {subcategory.items.map((item) => (
                              <label
                                key={item.id}
                                className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                                  checked={selectedFilters[item.id] || false}
                                  onChange={(e) =>
                                    handleFilterChange(item.id, e.target.checked)
                                  }
                                />
                                <span className="ml-3 text-sm text-gray-700">
                                  {item.label}
                                </span>
                              </label>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}