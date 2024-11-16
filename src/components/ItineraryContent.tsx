import React, { useMemo, useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import type { Experience } from '../types';
import { MOCK_EXPERIENCES } from '../data/mockData';
import { DayHeader } from './DayHeader';
import { FloatingExperienceDetail } from './FloatingExperienceDetail';

interface Activity extends Experience {
  startTime: string;
}

interface DayColumnProps {
  date: Date;
  activities: Activity[];
  isToday: boolean;
  currentTime: Date;
  onClick: () => void;
  onActivityClick: (activity: Activity) => void;
}

interface DayDetailProps {
  date: Date;
  activities: Activity[];
  currentTime: Date;
  onActivityClick: (activity: Activity) => void;
}

interface ItineraryContentProps {
  date: Date;
  currentTime: Date;
  zoomedDay: Date | null;
  onDayClick: (date: Date) => void;
  onActivityClick: (activity: Experience) => void;
}

const createMockActivities = (date: Date): Activity[] => {
  return MOCK_EXPERIENCES.map((exp, index) => ({
    ...exp,
    startTime: `${9 + index * 2}:00`
  }));
};

function DayColumn({ date, activities, isToday, currentTime, onClick, onActivityClick }: DayColumnProps) {
  const weather = {
    condition: 'sunny' as const,
    tempMin: 18,
    tempMax: 25
  };

  return (
    <div 
      className="flex-1 min-w-[200px] max-w-[300px] h-full overflow-y-auto bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <DayHeader date={date} isToday={isToday} weather={weather} />
      <div className="space-y-2 p-2">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            onClick={(e) => {
              e.stopPropagation();
              onActivityClick(activity);
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">{activity.startTime}</span>
              {isToday && activity.startTime === currentTime.getHours().toString().padStart(2, '0') + ':00' && (
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </div>
            <h3 className="font-medium text-gray-800 mb-1">{activity.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{activity.location.city}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{activity.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DayDetail({ date, activities, currentTime, onActivityClick }: DayDetailProps) {
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onActivityClick(activity)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-900">{activity.startTime}</span>
              {activity.startTime === currentTime.getHours().toString().padStart(2, '0') + ':00' && (
                <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                  Current
                </div>
              )}
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">{activity.title}</h3>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{activity.location.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{activity.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ItineraryContent({
  date,
  currentTime,
  zoomedDay,
  onDayClick,
  onActivityClick
}: ItineraryContentProps) {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const today = new Date();

  const handleActivityClick = (activity: Activity) => {
    setSelectedExperience(activity);
  };

  if (zoomedDay) {
    return (
      <>
        <DayDetail
          date={zoomedDay}
          activities={createMockActivities(zoomedDay)}
          currentTime={currentTime}
          onActivityClick={handleActivityClick}
        />
        <FloatingExperienceDetail
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex h-full divide-x divide-gray-200 overflow-x-auto">
        {Array.from({ length: 7 }).map((_, index) => {
          const currentDate = new Date(date);
          currentDate.setDate(date.getDate() + index);
          const isToday =
            currentDate.getDate() === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          return (
            <DayColumn
              key={currentDate.toISOString()}
              date={currentDate}
              activities={createMockActivities(currentDate)}
              isToday={isToday}
              currentTime={currentTime}
              onClick={() => onDayClick(currentDate)}
              onActivityClick={handleActivityClick}
            />
          );
        })}
      </div>
      <FloatingExperienceDetail
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </>
  );
}