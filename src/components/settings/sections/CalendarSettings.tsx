import React from 'react';
import { Switch } from '../../ui/Switch';
import { Select } from '../../ui/Select';
import type { AppSettings } from '../../../types/settings';

interface CalendarSettingsProps {
  settings: AppSettings['calendar'];
  onChange: (settings: AppSettings['calendar']) => void;
}

export const CalendarSettings: React.FC<CalendarSettingsProps> = ({
  settings,
  onChange
}) => {
  const colorOptions = [
    { value: '1', label: 'Lavender' },
    { value: '2', label: 'Sage' },
    { value: '3', label: 'Grape' },
    { value: '4', label: 'Flamingo' },
    { value: '5', label: 'Banana' }
  ];

  const reminderOptions = [
    { value: '0', label: 'No reminder' },
    { value: '5', label: '5 minutes before' },
    { value: '10', label: '10 minutes before' },
    { value: '15', label: '15 minutes before' },
    { value: '30', label: '30 minutes before' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Calendar Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            Automatically Add Events
          </label>
          <Switch
            checked={settings.autoAddEvents}
            onChange={(checked) =>
              onChange({ ...settings, autoAddEvents: checked })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Default Event Color
          </label>
          <Select
            value={settings.defaultEventColor}
            onChange={(value) =>
              onChange({ ...settings, defaultEventColor: value })
            }
            options={colorOptions}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Reminder Time
          </label>
          <Select
            value={settings.reminderTime.toString()}
            onChange={(value) =>
              onChange({ ...settings, reminderTime: parseInt(value) })
            }
            options={reminderOptions}
          />
        </div>
      </div>
    </div>
  );
};