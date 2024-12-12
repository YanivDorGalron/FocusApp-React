import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsLayout } from '../components/settings/SettingsLayout';
import { GeneralSettings } from '../components/settings/sections/GeneralSettings';
import { GoalsSettings } from '../components/settings/sections/GoalsSettings';
import { CalendarSettings } from '../components/settings/sections/CalendarSettings';
import { NotificationSettings } from '../components/settings/sections/NotificationSettings';
import { Button } from '../components/ui/Button';
import { Save, ArrowLeft } from 'lucide-react';
import type { AppSettings, SettingsSection } from '../types/settings';

const defaultSettings: AppSettings = {
  general: {
    defaultFocusDuration: 25,
    soundEnabled: true,
    darkMode: true,
    showNotifications: true,
  },
  goals: {
    weeklyFocusHours: 40,
    weeklySessionsTarget: 20,
    dailyFocusHours: 8,
  },
  calendar: {
    autoAddEvents: true,
    defaultEventColor: '1',
    reminderTime: 5,
  },
  notifications: {
    emailNotifications: true,
    browserNotifications: true,
    notifyOnComplete: true,
    notifyOnBreak: true,
  },
};

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingsChange = <T extends keyof AppSettings>(
    section: T,
    newSettings: AppSettings[T]
  ) => {
    setHasChanges(true);
    const updatedSettings = {
      ...settings,
      [section]: newSettings,
    };
    setSettings(updatedSettings);
  };

  const handleSaveAndReturn = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    // Dispatch a custom event to notify the main app about settings changes
    window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: settings }));
    navigate('/');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <GeneralSettings
            settings={settings.general}
            onChange={(newSettings) => handleSettingsChange('general', newSettings)}
          />
        );
      case 'goals':
        return (
          <GoalsSettings
            settings={settings.goals}
            onChange={(newSettings) => handleSettingsChange('goals', newSettings)}
          />
        );
      case 'calendar':
        return (
          <CalendarSettings
            settings={settings.calendar}
            onChange={(newSettings) => handleSettingsChange('calendar', newSettings)}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={settings.notifications}
            onChange={(newSettings) => handleSettingsChange('notifications', newSettings)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveAndReturn}
              className="flex items-center space-x-2"
              disabled={!hasChanges}
            >
              <Save className="w-4 h-4" />
              <span>Save & Return</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <nav className="space-y-2">
            {[
              { id: 'general', label: 'General', icon: Settings },
              { id: 'goals', label: 'Goals', icon: Target },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as SettingsSection)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="lg:col-span-3 bg-gray-800 rounded-xl p-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};