import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { Timer } from './components/Timer';
import { FocusForm } from './components/FocusForm';
import { ControlButtons } from './components/ControlButtons';
import { Stats } from './components/Stats';
import { GoogleAuthButton } from './components/GoogleAuthButton';
import { AuthCallback } from './components/AuthCallback';
import { Settings as SettingsPage } from './pages/Settings';
import { Settings as SettingsIcon } from 'lucide-react';
import { addFocusSessionToCalendar } from './services/googleAuth';
import { getAuthStatus } from './services/googleAuth';
import type { FocusStats } from './types';
import type { AppSettings } from './types/settings';

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

function MainApp() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [targetDuration, setTargetDuration] = useState(25);
  const [task, setTask] = useState('');
  const [ccEmail, setCCEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [stats, setStats] = useState<FocusStats>(() => {
    const saved = localStorage.getItem('focusStats');
    return saved
      ? JSON.parse(saved)
      : {
          totalFocusTime: 0,
          sessionsCompleted: 0,
          dailyFocusTimes: {},
        };
  });
  useEffect(() => {
    console.log('MainApp mounted');
  }, []);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('Checking authentication status...');
        const { isAuthenticated } = await getAuthStatus();
        console.log('Authentication status:', isAuthenticated);
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    let interval: number;
    if (isRunning && !isPaused) {
      interval = window.setInterval(() => {
        setElapsedTime((time) => {
          const newTime = time + 1;
          if (newTime >= targetDuration * 60) {
            handleStop();
            return time;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, targetDuration]);

  // Load settings from localStorage when they change
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      setTargetDuration(parsedSettings.general.defaultFocusDuration);
    }
  }, []);

  const handleStart = () => {
    console.log('Starting timer...');
    if (!task) {
      alert('Please enter a task');
      return;
    }
    if (!isAuthenticated) {
      alert('Please connect your Google Calendar first');
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
    console.log('Timer started with task:', task);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    console.log('Timer paused:', isPaused);
  };

  const handleStop = async () => {
    if (!isRunning) return;
    console.log('Stopping timer...');
    const today = new Date().toISOString().split('T')[0];

    try {
      if (isAuthenticated && settings.calendar.autoAddEvents) {
        console.log('Adding focus session to calendar...');
        await addFocusSessionToCalendar({
          startTime: new Date(Date.now() - elapsedTime * 1000),
          duration: targetDuration,
          task,
          ccEmail,
          colorId: parseInt(settings.calendar.defaultEventColor),
        });
        console.log('Focus session added to calendar.');
      }
    } catch (error) {
      console.error('Failed to add session to calendar:', error);
      alert('Failed to save session to calendar. Please try again.');
    }

    setStats((prev) => {
      const newStats = {
        totalFocusTime: prev.totalFocusTime + elapsedTime,
        sessionsCompleted: prev.sessionsCompleted + 1,
        dailyFocusTimes: {
          ...prev.dailyFocusTimes,
          [today]: (prev.dailyFocusTimes[today] || 0) + elapsedTime,
        },
      };
      localStorage.setItem('focusStats', JSON.stringify(newStats));
      return newStats;
    });

    setIsRunning(false);
    setIsPaused(false);
    setElapsedTime(0);
  };

  const handleAddTime = () => {
    if (!isRunning) {
      setTargetDuration((prev) => Math.min(120, prev + 5));
    }
  };

  const handleReduceTime = () => {
    if (!isRunning) {
      setTargetDuration((prev) => Math.max(5, prev - 5));
    }
  };

  const handleResetStats = () => {
    if (window.confirm('Are you sure you want to reset all statistics?')) {
      const newStats = {
        totalFocusTime: 0,
        sessionsCompleted: 0,
        dailyFocusTimes: {},
      };
      setStats(newStats);
      localStorage.setItem('focusStats', JSON.stringify(newStats));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Focus Timer</h1>
          <div className="flex items-center space-x-4">
            {!isAuthenticated && <GoogleAuthButton />}
            <button
              onClick={() => navigate('types/settings.ts')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              title="Settings"
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        <Timer
          label={isRunning ? 'Focus Time' : 'Ready to Focus'}
          time={elapsedTime}
          targetTime={targetDuration}
          className="mb-8"
        />

        <FocusForm
          task={task}
          duration={targetDuration.toString()}
          ccEmail={ccEmail}
          onTaskChange={setTask}
          onDurationChange={(value) => {
            const duration = parseInt(value) || 0;
            setTargetDuration(Math.max(5, Math.min(120, duration)));
          }}
          onCCEmailChange={setCCEmail}
          disabled={isRunning}
        />

        <ControlButtons
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onAddTime={handleAddTime}
          onReduceTime={handleReduceTime}
          disabled={!isAuthenticated}
        />

        <Stats stats={stats} onReset={handleResetStats} />
      </div>
    </div>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/oauth2callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}
