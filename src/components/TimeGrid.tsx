import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Navigation2, PlusSquare, MapPin, Clock, Check, ExternalLink } from 'lucide-react';

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
}

interface TimeGridProps {
  onDrop: (time: string) => void;
  isDragging: boolean;
  draggedItemPosition: { x: number; y: number } | null;
  scheduledItems: ScheduledItem[];
}

// Define hours array for the time slots
const hours = [
  '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
];

const MOCK_SCHEDULED_ITEMS: ScheduledItem[] = [
  {
    id: '1',
    type: 'restaurant',
    title: 'Breakfast at Le Pain Quotidien',
    description: 'Organic breakfast & brunch',
    address: '18 Place du Marché Saint-Honoré',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=300',
    startTime: '7:00 AM',
    duration: 1,
    isBooked: false
  },
  {
    id: '2',
    type: 'activity',
    title: 'Morning Seine River Walk',
    description: 'Guided walking tour along Seine',
    address: 'Pont des Arts',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=300',
    startTime: '8:00 AM',
    duration: 2,
    isBooked: true
  },
  {
    id: '3',
    type: 'restaurant',
    title: 'Lunch at L\'Ami Louis',
    description: 'Classic French bistro',
    address: '32 Rue du Vertbois',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=300',
    startTime: '1:00 PM',
    duration: 2,
    isBooked: true
  },
  {
    id: '4',
    type: 'restaurant',
    title: 'Dinner at L\'Arpège',
    description: 'Three Michelin stars restaurant',
    address: '84 Rue de Varenne',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=300',
    startTime: '7:00 PM',
    duration: 3,
    isBooked: false
  }
];

export function TimeGrid({ onDrop, isDragging, draggedItemPosition, scheduledItems }: TimeGridProps) {
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ScheduledItem[]>(MOCK_SCHEDULED_ITEMS);

  const handlePlusClick = (time: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSlot(expandedSlot === time ? null : time);
  };

  const handleGetDirections = (time: string) => {
    console.log('Getting directions for:', time);
  };

  const handleAddTimeSlot = (time: string) => {
    console.log('Adding time slot at:', time);
  };

  const handleBookingConfirm = (itemId: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isBooked: true } : item
      )
    );
  };

  const TimeSlotContent = ({ slot }: { slot: ScheduledItem }) => (
    <div className={`
      flex items-start gap-3 p-4 rounded-lg transition-all
      ${slot.isBooked 
        ? 'bg-white border border-emerald-200 shadow-sm' 
        : 'bg-white border-2 border-dashed border-yellow-300'
      }
    `}>
      <img
        src={slot.image}
        alt={slot.title}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900">{slot.title}</h3>
          {slot.isBooked && (
            <Check className="w-4 h-4 text-emerald-500" />
          )}
        </div>
        <p className="text-xs text-gray-600 mt-1">{slot.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <MapPin className="w-3 h-3" />
            <span>{slot.address}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>{slot.duration}h</span>
          </div>
        </div>
        {!slot.isBooked && (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => handleBookingConfirm(slot.id)}
              className="px-3 py-1 text-xs text-emerald-700 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              Confirm Booking
            </button>
            <button
              onClick={() => window.open('https://example.com/book', '_blank')}
              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div ref={gridRef} className="p-4 h-full overflow-y-auto">
      <div className="space-y-4">
        {hours.map((time) => {
          const slot = items.find(item => item.startTime === time);
          const is12PM = time === '12:00 PM';

          return (
            <div key={time} className="relative">
              <div className={`
                min-h-16 rounded-lg transition-all relative
                ${is12PM && isDragging ? 'border-2 border-gray-900 bg-gray-50' : ''}
              `}>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-600 w-16">
                    {time}
                  </span>
                  {slot && <TimeSlotContent slot={slot} />}
                </div>

                {/* Plus Icon */}
                <div className="absolute left-1/2 -bottom-3 -translate-x-1/2">
                  <button
                    onClick={(e) => handlePlusClick(time, e)}
                    className={`
                      w-6 h-6 rounded-full bg-white border border-gray-200 
                      flex items-center justify-center shadow-sm
                      hover:bg-gray-50 transition-colors
                      ${expandedSlot === time ? 'bg-gray-50' : ''}
                    `}
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Actions Menu */}
              <AnimatePresence>
                {expandedSlot === time && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                  >
                    <button
                      onClick={() => handleGetDirections(time)}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Navigation2 className="w-4 h-4" />
                      Get Directions
                    </button>
                    <button
                      onClick={() => handleAddTimeSlot(time)}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <PlusSquare className="w-4 h-4" />
                      Add Time Slot
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}