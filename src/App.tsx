import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Compass, Map, Calendar, Menu, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceCard } from './components/ExperienceCard';
import { ExperienceDetail } from './components/ExperienceDetail';
import { SearchFilters } from './components/SearchFilters';
import { PlanTrip } from './components/PlanTrip';
import { TripPlanSidebar } from './components/TripPlanSidebar';
import { TripView } from './components/TripView';
import { ExperienceSection } from './components/ExperienceSection';
import { GlobalItinerarySidebar } from './components/GlobalItinerarySidebar';
import { MOCK_EXPERIENCES, MOCK_RESTAURANTS, MOCK_MUSEUMS, MOCK_LANDMARKS } from './data/mockData';
import type { Experience, SearchFilters as SearchFiltersType } from './types';

const MOCK_TRIPS = [
  {
    id: '1',
    name: 'Paris Adventure 2024',
    destination: 'Paris, France',
    startDate: '2024-06-01',
    endDate: '2024-06-14',
    status: 'active' as const
  },
  {
    id: '2',
    name: 'Tokyo Exploration',
    destination: 'Tokyo, Japan',
    startDate: '2024-09-15',
    endDate: '2024-09-30',
    status: 'future' as const
  },
  {
    id: '3',
    name: 'Rome Weekend',
    destination: 'Rome, Italy',
    startDate: '2023-11-10',
    endDate: '2023-11-13',
    status: 'past' as const
  },
  {
    id: '4',
    name: 'Barcelona Summer',
    destination: 'Barcelona, Spain',
    startDate: '2023-08-05',
    endDate: '2023-08-15',
    status: 'past' as const
  }
];

function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Compass className="w-8 h-8 text-gray-900" />
              <span className="ml-2 text-xl font-bold text-gray-900">RoadTrip</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to={`/trip/${MOCK_TRIPS[0].id}`} 
              className="text-gray-500 hover:text-gray-700"
            >
              <Map className="w-6 h-6" />
            </Link>
            <button
              onClick={() => setShowItinerary(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Calendar className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Menu className="w-5 h-5" />
              My Trips
            </button>
          </div>
        </div>
      </div>

      <TripPlanSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        trips={MOCK_TRIPS}
        onNewTrip={() => {
          setIsSidebarOpen(false);
          window.location.href = '/plan';
        }}
      />

      <GlobalItinerarySidebar
        isOpen={showItinerary}
        onClose={() => setShowItinerary(false)}
      />
    </nav>
  );
}

function HomePage() {
  const [filters, setFilters] = useState<SearchFiltersType>({
    query: '',
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
    duration: ''
  });

  const [showPreferences, setShowPreferences] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const activeTrip = MOCK_TRIPS[0];

  const handleSearch = () => {
    console.log('Searching with query:', filters.query);
  };

  return (
    <div>
      <div 
        className="relative h-[500px] bg-cover bg-center grayscale"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2000)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
          <Link
            to={`/trip/${activeTrip.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors mb-6"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-300"></span>
              </span>
              <span className="text-white font-medium">
                Active Trip: {activeTrip.name}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-200">{activeTrip.destination}</span>
            </div>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Paris's Hidden Gems
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Search through thousands of experiences, from iconic landmarks to local favorites
          </p>

          <div className="w-full max-w-2xl flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for an experience (e.g., restaurants, landmarks, events)"
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <button 
              onClick={handleSearch}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-50"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 bg-white rounded-xl shadow-xl z-50 p-6"
            >
              <SearchFilters
                filters={filters}
                onFilterChange={setFilters}
                onClose={() => setShowFilters(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ExperienceSection
          title="Personalized Experiences"
          experiences={MOCK_EXPERIENCES}
          onPreferences={() => setShowPreferences(true)}
        />

        <ExperienceSection
          title="Restaurants Recommended for You"
          experiences={MOCK_RESTAURANTS}
          onPreferences={() => setShowPreferences(true)}
        />

        <ExperienceSection
          title="Museums You Might Like"
          experiences={MOCK_MUSEUMS}
          onPreferences={() => setShowPreferences(true)}
        />

        <ExperienceSection
          title="Must-Visit Landmarks"
          experiences={MOCK_LANDMARKS}
          onPreferences={() => setShowPreferences(true)}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan" element={<PlanTrip />} />
          <Route 
            path="/experience/:id" 
            element={<ExperienceDetail experience={MOCK_EXPERIENCES[0]} />} 
          />
          <Route
            path="/trip/:id"
            element={<TripView onOpenPreferences={() => setShowPreferences(true)} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}