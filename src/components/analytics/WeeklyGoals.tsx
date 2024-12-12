import React from 'react';
import { Target, Check, AlertCircle } from 'lucide-react';

interface WeeklyGoal {
  target: number;
  current: number;
  label: string;
}

interface WeeklyGoalsProps {
  goals: WeeklyGoal[];
}

export const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ goals }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Target className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Weekly Goals</h3>
      </div>
      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          const isCompleted = progress >= 100;

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{goal.label}</span>
                <div className="flex items-center space-x-2">
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className="text-sm font-medium">
                    {goal.current}/{goal.target}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isCompleted ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};