import React from 'react';
import { Switch } from '../../ui/Switch';
import type { AppSettings } from '../../../types/settings';

interface NotificationSettingsProps {
  settings: AppSettings['notifications'];
  onChange: (settings: AppSettings['notifications']) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Email Notifications</label>
          <Switch
            checked={settings.emailNotifications}
            onChange={(checked) =>
              onChange({ ...settings, emailNotifications: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Browser Notifications</label>
          <Switch
            checked={settings.browserNotifications}
            onChange={(checked) =>
              onChange({ ...settings, browserNotifications: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            Notify on Session Complete
          </label>
          <Switch
            checked={settings.notifyOnComplete}
            onChange={(checked) =>
              onChange({ ...settings, notifyOnComplete: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            Notify on Break Time
          </label>
          <Switch
            checked={settings.notifyOnBreak}
            onChange={(checked) =>
              onChange({ ...settings, notifyOnBreak: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};