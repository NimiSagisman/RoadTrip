import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, Check, ExternalLink, AlertTriangle, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimeGrid } from './TimeGrid';
import { ScheduledExperience } from './ScheduledExperience';

interface ItinerarySidebarProps {
  date: Date;
  onClose: () => void;
  isDraggingLocation: boolean;
  draggedLocation: any;
}

interface ScheduledItem {
  id: string;
  type: 'restaurant' | 'museum' | 'landmark' | 'activity';
  title: string;
  description: string;
  address: string;
  image: string;
  startTime: string;
  duration: number;
  isBooked: boolean;
}

export function ItinerarySidebar({
  date,
  onClose,
  isDraggingLocation,
  draggedLocation
}: ItinerarySidebarProps) {
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([]);
  const [showBookingPrompt, setShowBookingPrompt] = useState<string | null>(null);
  const [showConflictAlert, setShowConflictAlert] = useState(false);
  const [draggedItemPosition, setDraggedItemPosition] = useState<{ x: number; y: number } | null>(null);
  const [weather] = useState({
    temperature: 22,
    minTemp: 18,
    maxTemp: 26,
    condition: 'sunny'
  });

  const handleDrop = (time: string) => {
    if (!draggedLocation) return;

    // Check if the time slot is already occupied
    const existingItem = scheduledItems.find(item => item.startTime === time);
    if (existingItem) {
      setShowConflictAlert(true);
      setTimeout(() => setShowConflictAlert(false), 3000);
      return;
    }

    // Add the new item to scheduled items
    const newItem: ScheduledItem = {
      ...draggedLocation,
      startTime: time,
      duration: 2, // Default duration of 2 hours
      isBooked: false
    };

    setScheduledItems([...scheduledItems, newItem]);
    setShowBookingPrompt(newItem.id);
  };

  const handleBookingResponse = (itemId: string, isBooked: boolean) => {
    if (isBooked) {
      // Mark the item as booked
      setScheduledItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, isBooked: true } : item
        )
      );
    } else {
      // Open booking website if available
      const item = scheduledItems.find(item => item.id === itemId);
      if (item && 'website' in draggedLocation && draggedLocation.website) {
        window.open(draggedLocation.website, '_blank');
      }
    }
    setShowBookingPrompt(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-900">
            {formatDate(date)}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close itinerary"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className="font-medium">{weather.temperature}°</span>
          <span className="text-gray-400">·</span>
          <span className="text-xs">
            {weather.minTemp}° - {weather.maxTemp}°
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <TimeGrid 
          onDrop={handleDrop}
          isDragging={isDraggingLocation}
          draggedItemPosition={draggedItemPosition}
          scheduledItems={scheduledItems}
        />
      </div>

      {/* Conflict Alert */}
      <AnimatePresence>
        {showConflictAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-100 text-red-600 rounded-lg flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">This time slot is already booked</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Confirmation Dialog */}
      <AnimatePresence>
        {showBookingPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
          >
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Have you booked this experience?
              </h3>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleBookingResponse(showBookingPrompt, false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Book Now
                </button>
                <button
                  onClick={() => handleBookingResponse(showBookingPrompt, true)}
                  className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Already Booked
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}