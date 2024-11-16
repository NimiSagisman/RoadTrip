import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wand2, Compass } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  {
    title: "Gathering Relevant Information...",
    icon: Search
  },
  {
    title: "Tailoring Your Experience...",
    icon: Wand2
  },
  {
    title: "Planning Your Journey...",
    icon: Compass
  }
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000); // Complete after the last step
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-gray-900"
            >
              {React.createElement(loadingSteps[currentStep].icon, { size: 48 })}
            </motion.div>

            {/* Title */}
            <h2 className="text-xl font-medium text-gray-900">
              {loadingSteps[currentStep].title}
            </h2>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gray-900"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}