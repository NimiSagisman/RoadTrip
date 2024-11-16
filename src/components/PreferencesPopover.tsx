import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Calendar, ChevronRight, X, AlertTriangle } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface PreferencesPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onCalendarSync: (enabled: boolean) => void;
  calendarSyncEnabled: boolean;
  tripStatus?: 'active' | 'future' | 'past';
}

export function PreferencesPopover({
  isOpen,
  onClose,
  onCalendarSync,
  calendarSyncEnabled,
  tripStatus
}: PreferencesPopoverProps) {
  const navigate = useNavigate();
  const [showEndTripConfirm, setShowEndTripConfirm] = useState(false);

  const handleCalendarSync = async (enabled: boolean) => {
    if (enabled) {
      // In a real implementation, this would handle Google Calendar authentication
      console.log('Authenticating with Google Calendar...');
    }
    onCalendarSync(enabled);
  };

  const handleChangePlan = () => {
    navigate('/plan');
    onClose();
  };

  const handleEndTrip = () => {
    // In a real implementation, this would update the trip status in the backend
    console.log('Ending trip...');
    navigate('/');
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed right-4 top-20 w-64 bg-white rounded-lg shadow-lg p-4 z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                Trip Preferences
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </Dialog.Close>
            </div>

            <div className="space-y-4">
              {/* Calendar Sync Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Sync Calendar</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={calendarSyncEnabled}
                    onChange={(e) => handleCalendarSync(e.target.checked)}
                    aria-label="Toggle calendar sync"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>

              {/* Change Trip Plan Button */}
              <button
                onClick={handleChangePlan}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Change trip plan"
              >
                <span>Change Trip Plan</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* End Trip Button - Only show for active trips */}
              {tripStatus === 'active' && (
                <>
                  <hr className="border-gray-200" />
                  <button
                    onClick={() => setShowEndTripConfirm(true)}
                    className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    End Trip
                  </button>
                </>
              )}
            </div>

            <Dialog.Description className="sr-only">
              Manage your trip preferences and calendar synchronization settings
            </Dialog.Description>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>

      {/* End Trip Confirmation Dialog */}
      {showEndTripConfirm && (
        <Dialog.Root open={showEndTripConfirm} onOpenChange={setShowEndTripConfirm}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/20" />
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-lg shadow-lg p-6 z-50"
              >
                <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                  End This Trip?
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-600 mb-6">
                  Are you sure you want to end this trip? This will move it to your past trips history.
                </Dialog.Description>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowEndTripConfirm(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEndTrip}
                    className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    End Trip
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </Dialog.Root>
  );
}