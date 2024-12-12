import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend } from 'chart.js';

ChartJS.register(ArcElement, Legend);

interface TaskBreakdownProps {
  taskData: {
    task: string;
    timeSpent: number;
  }[];
}

export const TaskBreakdown: React.FC<TaskBreakdownProps> = ({ taskData }) => {
  const data = {
    labels: taskData.map(t => t.task),
    datasets: [{
      data: taskData.map(t => t.timeSpent / 60), // Convert to minutes
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#fff',
          padding: 20,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};