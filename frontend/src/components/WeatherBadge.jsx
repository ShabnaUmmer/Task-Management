import React from 'react';
import { FaCloudSun } from 'react-icons/fa';

export const WeatherBadge = ({ weather }) => {
  if (!weather) return null;

  return (
    <div style={{ fontSize: '12px', color: '#0066CC', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <FaCloudSun />
      <span>{weather.temp}°C, {weather.description} in {weather.cityName}</span>
    </div>
  );
};