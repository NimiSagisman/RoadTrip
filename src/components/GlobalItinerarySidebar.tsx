import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItineraryContent } from './ItineraryContent';
import { ExperienceCard } from './ExperienceCard';
import type { Experience } from '../types';

interface GlobalItinerarySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalItinerarySidebar({ isOpen, onClose }: GlobalItinerarySidebarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [zoomedDay, setZoomedDay] = useState<Date | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Experience | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDayClick = (date: Date) => {
    setZoomedDay(date);
  };

  const handleActivityClick = (activity: Experience) => {
    setSelectedActivity(activity);
  };

  const handleBack = () => {
    if (selectedActivity) {
      setSelectedActivity(null);
    } else if (zoomedDay) {
      setZoomedDay(null);
    }
  };

  const formatCurrentTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {(selectedActivity || zoomedDay) && (
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                  </button>
                )}
                <Calendar className="w-5 h-5 text-gray-500" />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedActivity
                      ? 'Activity Details'
                      : zoomedDay
                      ? zoomedDay.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Weekly Schedule'}
                  </h2>
                  <p className="text-sm text-gray-600">{formatCurrentTime(currentTime)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {!selectedActivity && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() - (zoomedDay ? 1 : 7));
                        setSelectedDate(newDate);
                        if (zoomedDay) {
                          setZoomedDay(newDate);
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <span className="text-sm font-medium text-gray-900">
                      {zoomedDay
                        ? zoomedDay.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })
                        : `${selectedDate.toLocaleDateString('en-US', {
                            month: 'long'
                          })} ${selectedDate.getDate()} - ${new Date(
                            selectedDate.getTime() + 6 * 24 * 60 * 60 * 1000
                          ).getDate()}`}
                    </span>
                    <button
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() + (zoomedDay ? 1 : 7));
                        setSelectedDate(newDate);
                        if (zoomedDay) {
                          setZoomedDay(newDate);
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {selectedActivity ? (
                <div className="p-4 h-full overflow-y-auto">
                  <ExperienceCard experience={selectedActivity} />
                </div>
              ) : (
                <ItineraryContent
                  date={selectedDate}
                  currentTime={currentTime}
                  zoomedDay={zoomedDay}
                  onDayClick={handleDayClick}
                  onActivityClick={handleActivityClick}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}