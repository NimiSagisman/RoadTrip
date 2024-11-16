import React from 'react';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

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
  website?: string;
}

interface ScheduledExperienceProps {
  item: ScheduledItem;
  onBookingPrompt: () => void;
}

export function ScheduledExperience({ item, onBookingPrompt }: ScheduledExperienceProps) {
  return (
    <div
      className={`p-4 rounded-lg ${
        item.isBooked
          ? 'bg-gray-50'
          : 'bg-white border-2 border-dashed border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{item.title}</h3>
          <div className="mt-1 space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{item.startTime}</span>
              <span className="text-gray-400">·</span>
              <span>{item.duration}h</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{item.address}</span>
            </div>
          </div>
        </div>
      </div>

      {!item.isBooked && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={onBookingPrompt}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Have you booked this?
          </button>
        </div>
      )}
    </div>
  );
}