import React from 'react';
import { Settings, ChevronRight } from 'lucide-react';
import { ExperienceCard } from './ExperienceCard';
import type { Experience } from '../types';

interface ExperienceSectionProps {
  title: string;
  experiences: Experience[];
  onPreferences: () => void;
}

export function ExperienceSection({ title, experiences, onPreferences }: ExperienceSectionProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onPreferences}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Preferences"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            More Experiences...
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onSave={() => console.log('Saved:', experience.id)}
          />
        ))}
      </div>
    </div>
  );
}