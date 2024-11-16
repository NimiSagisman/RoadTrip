import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceDetail } from './ExperienceDetail';
import type { Experience } from '../types';

interface FloatingExperienceDetailProps {
  experience: Experience | null;
  onClose: () => void;
}

export function FloatingExperienceDetail({ experience, onClose }: FloatingExperienceDetailProps) {
  if (!experience) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-[100]"
        onClick={onClose}
      />
      <motion.div
        key="content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-4 md:inset-10 z-[100] bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="h-full overflow-y-auto">
          <ExperienceDetail experience={experience} isBooked={true} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}