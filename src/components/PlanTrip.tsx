import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Plus, Trash2, Users, Plane, Utensils, Languages, Accessibility } from 'lucide-react';
import { LoadingScreen } from './LoadingScreen';

interface Destination {
  id: string;
  city: string;
  startDate: string;
  endDate: string;
}

interface TripDetails {
  name: string;
  destinations: Destination[];
  phase: 'planning' | 'traveling' | 'post-trip';
  travelers: {
    type: 'solo' | 'couple' | 'family' | 'group' | 'business';
    count: number;
  };
  interests: string[];
  budget: {
    accommodation: string;
    activities: string;
    dining: string;
  };
  preferences: {
    accommodation: string[];
    transportation: string[];
    dietary: string[];
    languages: string[];
    accessibility: string[];
  };
}

const INITIAL_TRIP_DETAILS: TripDetails = {
  name: '',
  destinations: [
    {
      id: '1',
      city: '',
      startDate: '',
      endDate: '',
    },
  ],
  phase: 'planning',
  travelers: {
    type: 'solo',
    count: 1,
  },
  interests: [],
  budget: {
    accommodation: 'medium',
    activities: 'medium',
    dining: 'medium',
  },
  preferences: {
    accommodation: [],
    transportation: [],
    dietary: [],
    languages: [],
    accessibility: [],
  },
};

export function PlanTrip() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [tripDetails, setTripDetails] = useState<TripDetails>(INITIAL_TRIP_DETAILS);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreateTrip = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/trip/1');
    }, 3000);
  };

  const addDestination = () => {
    setTripDetails({
      ...tripDetails,
      destinations: [
        ...tripDetails.destinations,
        {
          id: (tripDetails.destinations.length + 1).toString(),
          city: '',
          startDate: '',
          endDate: '',
        },
      ],
    });
  };

  const removeDestination = (id: string) => {
    if (tripDetails.destinations.length > 1) {
      setTripDetails({
        ...tripDetails,
        destinations: tripDetails.destinations.filter((dest) => dest.id !== id),
      });
    }
  };

  const updateDestination = (id: string, field: keyof Destination, value: string) => {
    setTripDetails({
      ...tripDetails,
      destinations: tripDetails.destinations.map((dest) =>
        dest.id === id ? { ...dest, [field]: value } : dest
      ),
    });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === currentStep
                ? 'bg-gray-900 text-white'
                : step < currentStep
                ? 'bg-gray-200 text-gray-700'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`w-16 h-0.5 ${
                step < currentStep ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Trip Name
        </label>
        <input
          type="text"
          value={tripDetails.name}
          onChange={(e) =>
            setTripDetails({ ...tripDetails, name: e.target.value })
          }
          placeholder="Summer Adventure 2024"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Travel Phase
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['planning', 'traveling', 'post-trip'].map((phase) => (
            <button
              key={phase}
              className={`px-4 py-2 rounded-lg text-sm ${
                tripDetails.phase === phase
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() =>
                setTripDetails({ ...tripDetails, phase: phase as any })
              }
            >
              {phase.charAt(0).toUpperCase() + phase.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Destinations
        </label>
        <div className="space-y-4">
          {tripDetails.destinations.map((destination, index) => (
            <div key={destination.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">
                  Destination {index + 1}
                </h4>
                {index > 0 && (
                  <button
                    onClick={() => removeDestination(destination.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <input
                type="text"
                value={destination.city}
                onChange={(e) =>
                  updateDestination(destination.id, 'city', e.target.value)
                }
                placeholder="City, Country"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={destination.startDate}
                    onChange={(e) =>
                      updateDestination(destination.id, 'startDate', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={destination.endDate}
                    onChange={(e) =>
                      updateDestination(destination.id, 'endDate', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addDestination}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Another Destination
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Traveler Type
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['solo', 'couple', 'family', 'group', 'business'].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg text-sm ${
                tripDetails.travelers.type === type
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() =>
                setTripDetails({
                  ...tripDetails,
                  travelers: { ...tripDetails.travelers, type: type as any },
                })
              }
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Travelers
        </label>
        <input
          type="number"
          min="1"
          value={tripDetails.travelers.count}
          onChange={(e) =>
            setTripDetails({
              ...tripDetails,
              travelers: {
                ...tripDetails.travelers,
                count: parseInt(e.target.value),
              },
            })
          }
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Cultural Sites',
            'Adventure Activities',
            'Food & Dining',
            'Nature & Outdoors',
            'Shopping',
            'Nightlife',
            'Art & Museums',
            'Local Experiences',
          ].map((interest) => (
            <button
              key={interest}
              className={`px-4 py-2 rounded-lg text-sm ${
                tripDetails.interests.includes(interest)
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() =>
                setTripDetails({
                  ...tripDetails,
                  interests: tripDetails.interests.includes(interest)
                    ? tripDetails.interests.filter((i) => i !== interest)
                    : [...tripDetails.interests, interest],
                })
              }
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget Preferences
        </label>
        <div className="space-y-4">
          {['accommodation', 'activities', 'dining'].map((category) => (
            <div key={category}>
              <label className="block text-sm text-gray-600 mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
              <div className="flex gap-4">
                {['budget', 'medium', 'luxury'].map((level) => (
                  <button
                    key={level}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm ${
                      tripDetails.budget[category as keyof typeof tripDetails.budget] ===
                      level
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() =>
                      setTripDetails({
                        ...tripDetails,
                        budget: {
                          ...tripDetails.budget,
                          [category]: level,
                        },
                      })
                    }
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accommodation Preferences
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Hotels',
            'Hostels',
            'Vacation Rentals',
            'Boutique Hotels',
            'Resorts',
          ].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg text-sm ${
                tripDetails.preferences.accommodation.includes(type)
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() =>
                setTripDetails({
                  ...tripDetails,
                  preferences: {
                    ...tripDetails.preferences,
                    accommodation: tripDetails.preferences.accommodation.includes(
                      type
                    )
                      ? tripDetails.preferences.accommodation.filter(
                          (t) => t !== type
                        )
                      : [...tripDetails.preferences.accommodation, type],
                  },
                })
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transportation Preferences
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Public Transit',
            'Car Rental',
            'Ride-sharing',
            'Walking',
            'Biking',
          ].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg text-sm ${
                tripDetails.preferences.transportation.includes(type)
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() =>
                setTripDetails({
                  ...tripDetails,
                  preferences: {
                    ...tripDetails.preferences,
                    transportation: tripDetails.preferences.transportation.includes(
                      type
                    )
                      ? tripDetails.preferences.transportation.filter(
                          (t) => t !== type
                        )
                      : [...tripDetails.preferences.transportation, type],
                  },
                })
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dietary Restrictions
        </label>
        <input
          type="text"
          placeholder="Enter dietary restrictions (comma-separated)"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          value={tripDetails.preferences.dietary.join(', ')}
          onChange={(e) =>
            setTripDetails({
              ...tripDetails,
              preferences: {
                ...tripDetails.preferences,
                dietary: e.target.value.split(',').map((item) => item.trim()),
              },
            })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Language Requirements
        </label>
        <input
          type="text"
          placeholder="Enter languages (comma-separated)"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          value={tripDetails.preferences.languages.join(', ')}
          onChange={(e) =>
            setTripDetails({
              ...tripDetails,
              preferences: {
                ...tripDetails.preferences,
                languages: e.target.value.split(',').map((item) => item.trim()),
              },
            })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accessibility Requirements
        </label>
        <input
          type="text"
          placeholder="Enter accessibility needs (comma-separated)"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          value={tripDetails.preferences.accessibility.join(', ')}
          onChange={(e) =>
            setTripDetails({
              ...tripDetails,
              preferences: {
                ...tripDetails.preferences,
                accessibility: e.target.value.split(',').map((item) => item.trim()),
              },
            })
          }
        />
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingScreen onComplete={() => navigate('/trip/1')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Plan Your Trip
          </h1>

          {renderStepIndicator()}

          <div className="mb-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevStep}
              className={`px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 ${
                currentStep === 1 ? 'invisible' : ''
              }`}
            >
              Previous
            </button>
            <button
              onClick={currentStep === 3 ? handleCreateTrip : handleNextStep}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              {currentStep === 3 ? 'Create Trip' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}