import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Plus, ExternalLink, Info } from 'lucide-react';
import { useDrag } from 'react-use-gesture';

interface Location {
  id: string;
  type: 'restaurant' | 'museum' | 'landmark' | 'activity';
  title: string;
  description: string;
  address: string;
  image: string;
  rating: number;
  price?: string;
  cuisine?: string;
  openingHours?: string;
  website?: string;
  coordinates: {
    x: number;
    y: number;
  };
}

interface MapPointProps {
  location: Location;
  onAddToItinerary: () => void;
  onViewDetails: () => void;
  onVisitWebsite: () => void;
  onDragStart: (location: Location) => void;
  onDragEnd: () => void;
}

export function MapPoint({
  location,
  onAddToItinerary,
  onViewDetails,
  onVisitWebsite,
  onDragStart,
  onDragEnd
}: MapPointProps) {
  const [showCard, setShowCard] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const bind = useDrag(({ down, movement: [mx, my], first, last }) => {
    if (first) {
      setIsDragging(true);
      onDragStart(location);
    }
    if (last) {
      setIsDragging(false);
      onDragEnd();
    }
  });

  return (
    <div
      className="absolute"
      style={{
        left: `${location.coordinates.x}%`,
        top: `${location.coordinates.y}%`,
      }}
      onMouseEnter={() => !isDragging && setShowCard(true)}
      onMouseLeave={() => !isDragging && setShowCard(false)}
    >
      {/* Location Pin */}
      <motion.div
        {...bind()}
        whileHover={{ scale: 1.1 }}
        className="relative z-10 cursor-grab active:cursor-grabbing"
      >
        <MapPin className="w-6 h-6 text-gray-900 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Hover Card */}
      <AnimatePresence>
        {showCard && !isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Card content remains the same */}
            <div className="relative h-32">
              <img
                src={location.image}
                alt={location.title}
                className="w-full h-full object-cover"
              />
              {location.price && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 text-white text-xs rounded">
                  {location.price}
                </span>
              )}
            </div>

            <div className="p-3">
              <h3 className="font-medium text-gray-900 mb-1">{location.title}</h3>
              
              {location.type === 'restaurant' && location.cuisine && (
                <p className="text-sm text-gray-600 mb-1">{location.cuisine} Cuisine</p>
              )}
              {location.type === 'museum' && location.openingHours && (
                <p className="text-sm text-gray-600 mb-1">{location.openingHours}</p>
              )}
              
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  {location.rating}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-3">{location.address}</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToItinerary();
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-gray-900 text-white text-xs rounded hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add to Itinerary
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails();
                  }}
                  className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                  title="View Details"
                >
                  <Info className="w-4 h-4" />
                </button>
                {location.website && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onVisitWebsite();
                    }}
                    className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Visit Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}