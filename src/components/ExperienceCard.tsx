import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
  onSave?: () => void;
}

export function ExperienceCard({ experience, onSave }: ExperienceCardProps) {
  return (
    <Link 
      to={`/experience/${experience.id}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden block"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={experience.images[0]}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {experience.title}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gray-900 fill-current" />
            <span className="text-sm font-medium">{experience.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {experience.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{experience.location.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{experience.duration}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: experience.price.currency,
            }).format(experience.price.value)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onSave?.();
            }}
            className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </Link>
  );
}