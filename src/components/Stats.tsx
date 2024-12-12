import React from 'react';
import { DailyStats } from './analytics/DailyStats';
import { ProductivityMetrics } from './analytics/ProductivityMetrics';
import { TaskBreakdown } from './analytics/TaskBreakdown';
import { WeeklyGoals } from './analytics/WeeklyGoals';
import type { FocusStats } from '../types';

interface StatsProps {
  stats: FocusStats;
  onReset: () => void;
}

export const Stats: React.FC<StatsProps> = ({ stats, onReset }) => {
  const averageSessionLength = stats.sessionsCompleted > 0
    ? (stats.totalFocusTime / stats.sessionsCompleted) / 60
    : 0;

  const productivityScore = Math.min(
    Math.round((stats.sessionsCompleted * averageSessionLength) / (25 * 8) * 100),
    100
  );

  // Sample task data - in a real app, this would come from your stats
  const taskData = [
    { task: 'Coding', timeSpent: 7200 },
    { task: 'Writing', timeSpent: 3600 },
    { task: 'Research', timeSpent: 5400 },
    { task: 'Planning', timeSpent: 2700 }
  ];

  // Sample weekly goals - in a real app, these would be customizable
  const weeklyGoals = [
    { label: 'Focus Hours', current: stats.totalFocusTime / 3600, target: 40 },
    { label: 'Sessions', current: stats.sessionsCompleted, target: 20 },
    { label: 'Tasks Completed', current: 15, target: 25 }
  ];

  return (
    <div className="space-y-6">
      <ProductivityMetrics
        totalFocusTime={stats.totalFocusTime}
        sessionsCompleted={stats.sessionsCompleted}
        averageSessionLength={averageSessionLength}
        productivityScore={productivityScore}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyStats dailyFocusTimes={stats.dailyFocusTimes} />
        <TaskBreakdown taskData={taskData} />
      </div>

      <WeeklyGoals goals={weeklyGoals} />

      <button
        onClick={onReset}
        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
      >
        Reset Statistics
      </button>
    </div>
  );
};