import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

interface WeatherProps {
  weather: {
    temperature: number;
    condition: string;
    precipitation: number;
  };
}

export function WeatherIndicator({ weather }: WeatherProps) {
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg">
      {getWeatherIcon()}
      <span className="text-sm font-medium text-gray-700">
        {weather.temperature}°C
      </span>
      {weather.precipitation > 0 && (
        <span className="text-sm text-gray-500">
          {weather.precipitation}% rain
        </span>
      )}
    </div>
  );
}