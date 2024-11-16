import React from 'react';
import { Sun, Cloud, CloudRain, AlertTriangle } from 'lucide-react';

interface WeatherInfo {
  condition: 'sunny' | 'cloudy' | 'rainy';
  tempMin: number;
  tempMax: number;
  alerts?: string[];
  packingTips?: string[];
}

interface DayHeaderProps {
  date: Date;
  isToday: boolean;
  weather: WeatherInfo;
  highlight?: string;
}

const WeatherIcon = ({ condition }: { condition: WeatherInfo['condition'] }) => {
  const icons = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain
  };

  const Icon = icons[condition];
  return <Icon className="w-5 h-5 text-gray-600" />;
};

// Fixed weather data for each day of the week
const FIXED_WEATHER_DATA: Record<number, WeatherInfo> = {
  0: { condition: 'sunny', tempMin: 18, tempMax: 25 },    // Sunday
  1: { condition: 'cloudy', tempMin: 16, tempMax: 22 },   // Monday
  2: { condition: 'sunny', tempMin: 19, tempMax: 26 },    // Tuesday
  3: { condition: 'rainy', tempMin: 15, tempMax: 20 },    // Wednesday
  4: { condition: 'cloudy', tempMin: 17, tempMax: 23 },   // Thursday
  5: { condition: 'sunny', tempMin: 20, tempMax: 27 },    // Friday
  6: { condition: 'rainy', tempMin: 16, tempMax: 21 }     // Saturday
};

export function DayHeader({ date, isToday, weather: _weather, highlight }: DayHeaderProps) {
  // Use fixed weather data based on the day of the week
  const weather = FIXED_WEATHER_DATA[date.getDay()];
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between px-2 h-14 border-b border-gray-100">
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-600">
            {date.toLocaleDateString('en-US', { weekday: 'short' })}
          </p>
          <p className={`text-xl ${isToday ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
            {date.getDate()}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <WeatherIcon condition={weather.condition} />
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-700">{weather.tempMax}°</span>
            <span className="text-xs text-gray-500">{weather.tempMin}°</span>
          </div>
        </div>
      </div>

      {/* Alerts - If Any */}
      {weather.alerts && weather.alerts.length > 0 && (
        <div className="relative group mt-2 flex justify-center">
          <AlertTriangle className="w-4 h-4 text-gray-600" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-48 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {weather.alerts.map((alert, index) => (
              <p key={index} className="mb-1 last:mb-0">{alert}</p>
            ))}
          </div>
        </div>
      )}

      {/* Highlight - If Any */}
      {highlight && (
        <div className="mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full text-center">
          {highlight}
        </div>
      )}
    </div>
  );
}