import React from 'react';
import { 
  Landmark, 
  UtensilsCrossed, 
  Building2, 
  TreePine, 
  ShoppingBag,
  Music,
  Wine,
  Camera
} from 'lucide-react';

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { id: 'landmarks', label: 'Landmarks', icon: Landmark },
  { id: 'restaurants', label: 'Restaurants & Cafes', icon: UtensilsCrossed },
  { id: 'museums', label: 'Museums & Art', icon: Building2 },
  { id: 'outdoor', label: 'Outdoor Activities', icon: TreePine },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'nightlife', label: 'Nightlife', icon: Music },
  { id: 'wine', label: 'Wine & Spirits', icon: Wine },
  { id: 'photo', label: 'Photo Spots', icon: Camera }
];

interface ExperienceCategoriesProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

export function ExperienceCategories({ selectedCategory, onCategorySelect }: ExperienceCategoriesProps) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-4 pb-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl transition-all
                min-w-[100px] hover:bg-gray-50
                ${isSelected ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-gray-600'}
              `}
            >
              <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
              <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}