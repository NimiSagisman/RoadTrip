import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search, 
  Settings, 
  ArrowLeft, 
  Calendar,
  ChevronRight, 
  ChevronLeft, 
  Navigation2,
  Sun
} from 'lucide-react';
import { MapCategoryFilters } from './MapCategoryFilters';
import { Map } from './Map';
import { ItinerarySidebar } from './ItinerarySidebar';
import { PreferencesPopover } from './PreferencesPopover';

interface TripViewProps {
  onOpenPreferences: () => void;
}

const MOCK_TRIPS = [
  {
    id: '1',
    name: 'Paris Adventure 2024',
    destination: 'Paris, France',
    startDate: '2024-06-01',
    endDate: '2024-06-14',
    status: 'active' as const,
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: '2',
    name: 'Tokyo Exploration',
    destination: 'Tokyo, Japan',
    startDate: '2024-09-15',
    endDate: '2024-09-30',
    status: 'future' as const,
    coordinates: { lat: 35.6762, lng: 139.6503 }
  }
];

export function TripView({ onOpenPreferences }: TripViewProps) {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showItinerary, setShowItinerary] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(false);
  const [isDraggingLocation, setIsDraggingLocation] = useState(false);
  const [draggedLocation, setDraggedLocation] = useState<any>(null);
  const [weather] = useState({
    temperature: 22,
    condition: 'sunny',
    precipitation: 0
  });

  const trip = MOCK_TRIPS.find(t => t.id === id);
  if (!trip) return null;

  const handleGetDirections = () => {
    console.log('Getting directions...');
  };

  const handleFiltersChange = (filters: Record<string, boolean>) => {
    setActiveFilters(filters);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCalendarSync = (enabled: boolean) => {
    setCalendarSyncEnabled(enabled);
  };

  const handleLocationDragStart = (location: any) => {
    setIsDraggingLocation(true);
    setDraggedLocation(location);
  };

  const handleLocationDragEnd = () => {
    setIsDraggingLocation(false);
    setDraggedLocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">{trip.destination}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trip.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    trip.status === 'future' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowPreferences(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for attractions, restaurants, and more..."
                  className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handleGetDirections}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Navigation2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() - 1);
                    setSelectedDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <span className="text-sm font-medium text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <button
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() + 1);
                    setSelectedDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {!showItinerary && (
                <button
                  onClick={() => setShowItinerary(true)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Open Calendar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 h-[calc(100vh-136px)] relative flex">
        <MapCategoryFilters onFiltersChange={handleFiltersChange} />
        <div className="flex-1">
          <Map
            center={trip.coordinates}
            zoom={13}
            onLocationDragStart={handleLocationDragStart}
            onLocationDragEnd={handleLocationDragEnd}
          />
        </div>
        {showItinerary && (
          <ItinerarySidebar
            date={selectedDate}
            onClose={() => setShowItinerary(false)}
            isDraggingLocation={isDraggingLocation}
            draggedLocation={draggedLocation}
          />
        )}
      </div>

      <PreferencesPopover
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onCalendarSync={handleCalendarSync}
        calendarSyncEnabled={calendarSyncEnabled}
        tripStatus={trip.status}
      />
    </div>
  );
}