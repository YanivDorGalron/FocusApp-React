import React from 'react';
import { Bar } from 'react-chartjs-2';
import { formatTime } from '../../utils/timeUtils';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface DailyStatsProps {
  dailyFocusTimes: Record<string, number>;
}

export const DailyStats: React.FC<DailyStatsProps> = ({ dailyFocusTimes }) => {
  const last7Days = Object.entries(dailyFocusTimes)
    .slice(-7)
    .map(([date, seconds]) => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      hours: seconds / 3600
    }));

  const data = {
    labels: last7Days.map(d => d.date),
    datasets: [{
      label: 'Hours Focused',
      data: last7Days.map(d => d.hours),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderRadius: 6
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Daily Focus Time',
        color: '#fff'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.parsed.y.toFixed(2)} hours`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#fff'
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};