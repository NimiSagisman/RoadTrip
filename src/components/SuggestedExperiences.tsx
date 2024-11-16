import React from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { ExperienceCard } from './ExperienceCard';
import type { Experience } from '../types';

interface SuggestedExperiencesProps {
  highlights: Experience[];
  suggestions: Experience[];
}

export function SuggestedExperiences({ highlights, suggestions }: SuggestedExperiencesProps) {
  return (
    <div className="mb-12">
      {/* Today's Highlights */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-900">Highlights for Today</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((experience) => (
            <div key={experience.id} className="relative">
              <div className="absolute -top-2 -right-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full z-10">
                Popular Today
              </div>
              <ExperienceCard
                experience={experience}
                onSave={() => console.log('Saved:', experience.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Experiences */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900">Perfect for Your Schedule</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onSave={() => console.log('Saved:', experience.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}