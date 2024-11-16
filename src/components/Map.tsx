import React, { useState } from 'react';
import { MapPoint } from './MapPoint';
import { Plus, ExternalLink, Info } from 'lucide-react';

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
    x: number; // percentage from left
    y: number; // percentage from top
  };
}

const LOCATIONS: Location[] = [
  {
    id: '1',
    type: 'restaurant',
    title: 'Le Jules Verne',
    description: 'Fine dining with panoramic views',
    address: 'Eiffel Tower, 2nd Floor, Champ de Mars',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=300',
    rating: 4.8,
    price: '$$$',
    cuisine: 'French',
    website: 'https://www.lejulesverne-paris.com',
    coordinates: { x: 35, y: 45 }
  },
  {
    id: '2',
    type: 'museum',
    title: 'Louvre Museum',
    description: 'World\'s largest art museum',
    address: 'Rue de Rivoli, 75001 Paris',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=300',
    rating: 4.9,
    openingHours: '9:00 AM - 6:00 PM',
    website: 'https://www.louvre.fr',
    coordinates: { x: 55, y: 30 }
  },
  {
    id: '3',
    type: 'landmark',
    title: 'Notre-Dame Cathedral',
    description: 'Medieval Catholic cathedral',
    address: '6 Parvis Notre-Dame - Pl. Jean-Paul II',
    image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&q=80&w=300',
    rating: 4.8,
    openingHours: '8:00 AM - 6:45 PM',
    website: 'https://www.notredamedeparis.fr',
    coordinates: { x: 65, y: 60 }
  },
  {
    id: '4',
    type: 'activity',
    title: 'Seine River Cruise',
    description: 'Scenic boat tour along the Seine',
    address: 'Port de la Bourdonnais',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=300',
    rating: 4.7,
    price: '$$',
    website: 'https://www.bateauxparisiens.com',
    coordinates: { x: 45, y: 75 }
  }
];

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  onLocationDragStart: (location: Location) => void;
  onLocationDragEnd: () => void;
}

export function Map({ center, zoom, onLocationDragStart, onLocationDragEnd }: MapProps) {
  const handleAddToItinerary = (location: Location) => {
    console.log('Adding to itinerary:', location.title);
    // Implement itinerary addition logic
  };

  const handleViewDetails = (location: Location) => {
    console.log('Viewing details:', location.title);
    // Implement view details logic
  };

  const handleVisitWebsite = (website: string) => {
    window.open(website, '_blank');
  };

  return (
    <div className="w-full h-full bg-white relative">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://gisgeography.com/wp-content/uploads/2023/02/Paris-Road-Map-1000x773.jpg"
          alt="Road map of Paris"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/5" />

        {/* Points of Interest */}
        {LOCATIONS.map((location) => (
          <MapPoint
            key={location.id}
            location={location}
            onAddToItinerary={() => handleAddToItinerary(location)}
            onViewDetails={() => handleViewDetails(location)}
            onVisitWebsite={() => location.website && handleVisitWebsite(location.website)}
            onDragStart={() => onLocationDragStart(location)}
            onDragEnd={onLocationDragEnd}
          />
        ))}
      </div>
    </div>
  );
}