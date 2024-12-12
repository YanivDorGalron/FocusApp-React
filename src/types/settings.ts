export interface AppSettings {
  general: {
    defaultFocusDuration: number;
    soundEnabled: boolean;
    darkMode: boolean;
    showNotifications: boolean;
  };
  goals: {
    weeklyFocusHours: number;
    weeklySessionsTarget: number;
    dailyFocusHours: number;
  };
  calendar: {
    autoAddEvents: boolean;
    defaultEventColor: string;
    reminderTime: number;
  };
  notifications: {
    emailNotifications: boolean;
    browserNotifications: boolean;
    notifyOnComplete: boolean;
    notifyOnBreak: boolean;
  };
}

export type SettingsSection = 'general' | 'goals' | 'calendar' | 'notifications';