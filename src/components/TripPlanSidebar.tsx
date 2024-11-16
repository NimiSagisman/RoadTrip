import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Plus, MapPin, Calendar } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'future' | 'past';
}

interface TripPlanSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  trips: Trip[];
  onNewTrip: () => void;
}

const StatusLabel = ({ status }: { status: Trip['status'] }) => {
  const styles = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    future: 'bg-blue-100 text-blue-700 border-blue-200',
    past: 'bg-gray-100 text-gray-600 border-gray-200'
  };

  const labels = {
    active: 'Active trip',
    future: 'Future trip',
    past: 'Past trip'
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export function TripPlanSidebar({ isOpen, onClose, trips, onNewTrip }: TripPlanSidebarProps) {
  const navigate = useNavigate();
  const { id: currentTripId } = useParams();

  const handleTripClick = (tripId: string) => {
    navigate(`/trip/${tripId}`);
    onClose();
  };

  const sortedTrips = [...trips].sort((a, b) => {
    const order = { active: 0, future: 1, past: 2 };
    return order[a.status] - order[b.status] || new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <>
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 z-40"
                  onClick={onClose}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                      Your Trips
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4">
                    {sortedTrips.length === 0 ? (
                      <div className="text-center py-8 px-4">
                        <p className="text-gray-500">No trips planned yet.</p>
                        <p className="text-gray-500 text-sm mt-2">
                          Click the button below to start planning your first adventure!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 px-4">
                        {sortedTrips.map((trip) => (
                          <button
                            key={trip.id}
                            onClick={() => handleTripClick(trip.id)}
                            className={`w-full p-4 rounded-lg transition-colors text-left group ${
                              trip.id === currentTripId
                                ? 'bg-gray-100 ring-2 ring-gray-900'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                                {trip.name}
                              </h3>
                              <StatusLabel status={trip.status} />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="w-4 h-4 mr-2" />
                                {trip.destination}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(trip.startDate).toLocaleDateString()} -{' '}
                                {new Date(trip.endDate).toLocaleDateString()}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={onNewTrip}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      New Trip
                    </button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}