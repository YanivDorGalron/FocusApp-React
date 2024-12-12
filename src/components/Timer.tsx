import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface TimerProps {
  label: string;
  time: number;
  targetTime: number;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ label, time, targetTime, className }) => (
  <div className={`text-center ${className}`}>
    <div className="text-4xl font-bold text-green-500">{formatTime(time)}</div>
    <div className="text-xl font-semibold text-blue-400">Target: {targetTime} minutes</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);