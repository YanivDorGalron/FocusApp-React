import React from 'react';
import { Play, Pause, Square, Plus, Minus } from 'lucide-react';

interface ControlButtonsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onAddTime: () => void;
  onReduceTime: () => void;
  disabled?: boolean;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onStop,
  onAddTime,
  onReduceTime,
  disabled = false,
}) => (
  <div className="flex justify-center items-center space-x-4">
    <div className="flex space-x-2">
      <button
        onClick={onReduceTime}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        title="Reduce 5 minutes"
        disabled={isRunning || disabled}
      >
        <Minus className="w-5 h-5" />
      </button>
      <button
        onClick={onAddTime}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        title="Add 5 minutes"
        disabled={isRunning || disabled}
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>

    <div className="flex space-x-2">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          <Play className="w-5 h-5" />
          <span>Start</span>
        </button>
      ) : (
        <>
          <button
            onClick={onPause}
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md flex items-center space-x-2"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
          <button
            onClick={onStop}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md flex items-center space-x-2"
          >
            <Square className="w-5 h-5" />
            <span>Stop</span>
          </button>
        </>
      )}
    </div>
  </div>
);