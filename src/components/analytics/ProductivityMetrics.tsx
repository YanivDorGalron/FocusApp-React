import React from 'react';
import { Clock, Target, Zap, TrendingUp } from 'lucide-react';
import { formatTime } from '../../utils/timeUtils';

interface ProductivityMetricsProps {
  totalFocusTime: number;
  sessionsCompleted: number;
  averageSessionLength: number;
  productivityScore: number;
}

export const ProductivityMetrics: React.FC<ProductivityMetricsProps> = ({
  totalFocusTime,
  sessionsCompleted,
  averageSessionLength,
  productivityScore
}) => {
  const metrics = [
    {
      label: 'Total Focus Time',
      value: formatTime(totalFocusTime),
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      label: 'Sessions Completed',
      value: sessionsCompleted,
      icon: Target,
      color: 'text-green-500'
    },
    {
      label: 'Avg. Session Length',
      value: `${Math.round(averageSessionLength)} min`,
      icon: Zap,
      color: 'text-yellow-500'
    },
    {
      label: 'Productivity Score',
      value: `${productivityScore}%`,
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-gray-800 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
            <h3 className="text-sm font-medium text-gray-400">{metric.label}</h3>
          </div>
          <p className={`text-2xl font-bold mt-2 ${metric.color}`}>{metric.value}</p>
        </div>
      ))}
    </div>
  );
};