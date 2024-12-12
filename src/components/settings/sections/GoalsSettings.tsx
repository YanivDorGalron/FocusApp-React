import React from 'react';
import { Input } from '../../ui/Input';
import type { AppSettings } from '../../../types/settings';

interface GoalsSettingsProps {
  settings: AppSettings['goals'];
  onChange: (settings: AppSettings['goals']) => void;
}

export const GoalsSettings: React.FC<GoalsSettingsProps> = ({
  settings,
  onChange
}) => {
  const handleChange = (key: keyof AppSettings['goals']) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value) || 0;
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Goals Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Weekly Focus Hours Target
          </label>
          <Input
            type="number"
            value={settings.weeklyFocusHours}
            onChange={handleChange('weeklyFocusHours')}
            min={1}
            max={168}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Weekly Sessions Target
          </label>
          <Input
            type="number"
            value={settings.weeklySessionsTarget}
            onChange={handleChange('weeklySessionsTarget')}
            min={1}
            max={100}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Daily Focus Hours Target
          </label>
          <Input
            type="number"
            value={settings.dailyFocusHours}
            onChange={handleChange('dailyFocusHours')}
            min={1}
            max={24}
          />
        </div>
      </div>
    </div>
  );
};