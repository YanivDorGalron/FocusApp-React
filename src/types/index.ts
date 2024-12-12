export interface FocusStats {
  totalFocusTime: number;
  sessionsCompleted: number;
  dailyFocusTimes: Record<string, number>;
  taskBreakdown?: Array<{
    task: string;
    timeSpent: number;
  }>;
  weeklyGoals?: Array<{
    label: string;
    current: number;
    target: number;
  }>;
}

export interface FocusSession {
  startTime: Date;
  duration: number;
  task: string;
  ccEmail?: string;
  colorId?: number;
}

export interface AuthStatus {
  isAuthenticated: boolean;
}