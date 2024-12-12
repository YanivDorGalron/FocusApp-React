import React from 'react';
import { Switch } from '../../ui/Switch';
import { Slider } from '../../ui/Slider';
import type { AppSettings } from '../../../types/settings';

interface GeneralSettingsProps {
  settings: AppSettings['general'];
  onChange: (settings: AppSettings['general']) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">General Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Default Focus Duration (minutes)
          </label>
          <Slider
            value={settings.defaultFocusDuration}
            onChange={(value) =>
              onChange({ ...settings, defaultFocusDuration: value })
            }
            min={5}
            max={120}
            step={5}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Sound Effects</label>
          <Switch
            checked={settings.soundEnabled}
            onChange={(checked) =>
              onChange({ ...settings, soundEnabled: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Dark Mode</label>
          <Switch
            checked={settings.darkMode}
            onChange={(checked) =>
              onChange({ ...settings, darkMode: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Show Notifications</label>
          <Switch
            checked={settings.showNotifications}
            onChange={(checked) =>
              onChange({ ...settings, showNotifications: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};