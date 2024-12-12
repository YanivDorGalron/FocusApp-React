import React from 'react';
import { Clock, Mail, FileText } from 'lucide-react';

interface FocusFormProps {
  task: string;
  duration: string;
  ccEmail: string;
  onTaskChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onCCEmailChange: (value: string) => void;
  disabled?: boolean;
}

export const FocusForm: React.FC<FocusFormProps> = ({
  task,
  duration,
  ccEmail,
  onTaskChange,
  onDurationChange,
  onCCEmailChange,
  disabled = false,
}) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-2">
      <FileText className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={task}
        onChange={(e) => onTaskChange(e.target.value)}
        placeholder="What are you working on?"
        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={disabled}
      />
    </div>
    
    <div className="flex items-center space-x-2">
      <Clock className="w-5 h-5 text-gray-400" />
      <input
        type="number"
        value={duration}
        onChange={(e) => onDurationChange(e.target.value)}
        placeholder="Duration (minutes)"
        min="5"
        max="120"
        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={disabled}
      />
    </div>
    
    <div className="flex items-center space-x-2">
      <Mail className="w-5 h-5 text-gray-400" />
      <input
        type="email"
        value={ccEmail}
        onChange={(e) => onCCEmailChange(e.target.value)}
        placeholder="CC Email (optional)"
        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={disabled}
      />
    </div>
  </div>
);