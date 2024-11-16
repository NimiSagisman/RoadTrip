import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Star, 
  Share2, 
  Heart,
  Calendar,
  Users,
  DollarSign,
  Globe,
  Phone,
  Navigation2,
  MessageCircle,
  Wifi,
  Accessibility,
  AlertTriangle
} from 'lucide-react';
import type { Experience } from '../types';

interface ExperienceDetailProps {
  experience: Experience;
  isBooked?: boolean;
}

export function ExperienceDetail({ experience, isBooked = false }: ExperienceDetailProps) {
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancelBooking = () => {
    console.log('Canceling booking...');
    setShowCancelConfirm(false);
  };

  const amenities = [
    'Free Wi-Fi',
    'Wheelchair Accessible',
    'Air Conditioning',
    'Restaurant',
    'Bar',
    'Parking'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Rest of the component remains the same */}
          <div className="relative h-96">
            <img
              src={experience.images[0]}
              alt={experience.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {experience.title}
                </h1>
                <div className="flex items-center gap-4">
                  <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                  <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                    <Heart className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{experience.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{experience.location.city}, {experience.location.country}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{experience.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 p-8">
            <div className="col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Experience</h2>
                <p className="text-gray-600 leading-relaxed">{experience.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h2>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-600">Skip-the-line access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-600">Small group tour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-600">Multiple languages available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-600">Flexible booking</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      {amenity.includes('Wi-Fi') && <Wifi className="w-4 h-4 text-gray-500" />}
                      {amenity.includes('Wheelchair') && (
                        <Accessibility className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <a href="#" className="text-blue-600 hover:underline">Visit Website</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation2 className="w-5 h-5 text-gray-500" />
                    <a href="#" className="text-blue-600 hover:underline">Get Directions</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: experience.price.currency,
                    }).format(experience.price.value)}
                  </span>
                  <span className="text-gray-600 ml-1">per person</span>
                </div>

                {isBooked ? (
                  <>
                    <div className="w-full bg-emerald-100 text-emerald-700 px-6 py-3 rounded-lg mb-4 flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Booked!</span>
                    </div>
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="w-full border border-red-200 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  </>
                ) : (
                  <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors mb-4">
                    Book Now
                  </button>
                )}

                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Free cancellation up to 24h before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Group discounts available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Lowest price guarantee</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Reviews</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{experience.rating}</span>
                    <span className="text-gray-600 ml-1">(2,145)</span>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Read Reviews</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Cancel Booking?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}