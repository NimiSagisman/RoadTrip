import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateTimePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DateTimePicker({ selectedDate, onDateChange }: DateTimePickerProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => {
            // Implement date picker dialog
          }}
        >
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{formatDate(selectedDate)}</span>
        </button>
      </div>
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => {
            // Implement time picker dialog
          }}
        >
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{formatTime(selectedDate)}</span>
        </button>
      </div>
    </div>
  );
}