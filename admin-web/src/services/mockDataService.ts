import { useEffect, useState } from 'react';
import { subDays, subHours, format } from 'date-fns';

// --- Types ---

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'inactive' | 'blocked';
  joinedAt: string;
  lastActive: string;
};

export type Conversation = {
  id: string;
  userId: string;
  anonymizedName: string;
  status: 'active' | 'ended';
  startedAt: string;
  lastMessageAt: string;
  messagesCount: number;
  riskLevel: 'low' | 'medium' | 'high';
};

export type Alert = {
  id: string;
  type: 'crisis' | 'system' | 'report';
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  status: 'new' | 'acknowledged' | 'resolved';
};

export type MoodDataPoint = {
  date: string;
  averageMood: number; // 1 to 5
  totalCheckins: number;
};

// --- Initial Mock Data Generators ---

const generateMockUsers = (): User[] => {
  return [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'admin', status: 'active', joinedAt: subDays(new Date(), 100).toISOString(), lastActive: new Date().toISOString() },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'active', joinedAt: subDays(new Date(), 50).toISOString(), lastActive: subHours(new Date(), 2).toISOString() },
    { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', role: 'user', status: 'blocked', joinedAt: subDays(new Date(), 10).toISOString(), lastActive: subDays(new Date(), 5).toISOString() },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'user', status: 'inactive', joinedAt: subDays(new Date(), 200).toISOString(), lastActive: subDays(new Date(), 30).toISOString() },
  ];
};

const generateMockConversations = (): Conversation[] => {
  return [
    { id: 'c1', userId: '2', anonymizedName: 'User #492', status: 'active', startedAt: subHours(new Date(), 1).toISOString(), lastMessageAt: new Date().toISOString(), messagesCount: 15, riskLevel: 'low' },
    { id: 'c2', userId: '5', anonymizedName: 'User #811', status: 'active', startedAt: subHours(new Date(), 0.5).toISOString(), lastMessageAt: subHours(new Date(), 0.1).toISOString(), messagesCount: 32, riskLevel: 'high' },
    { id: 'c3', userId: '6', anonymizedName: 'User #102', status: 'ended', startedAt: subHours(new Date(), 5).toISOString(), lastMessageAt: subHours(new Date(), 4).toISOString(), messagesCount: 10, riskLevel: 'medium' },
  ];
};

const generateMockAlerts = (): Alert[] => {
  return [
    { id: 'a1', type: 'crisis', message: 'High risk conversation detected (User #811)', severity: 'high', timestamp: new Date().toISOString(), status: 'new' },
    { id: 'a2', type: 'system', message: 'API response time degraded', severity: 'medium', timestamp: subHours(new Date(), 1).toISOString(), status: 'acknowledged' },
    { id: 'a3', type: 'report', message: 'Content reported by user', severity: 'low', timestamp: subHours(new Date(), 12).toISOString(), status: 'resolved' },
  ];
};

const generateMockMoodData = (): MoodDataPoint[] => {
  const data: MoodDataPoint[] = [];
  for (let i = 14; i >= 0; i--) {
    const d = subDays(new Date(), i);
    data.push({
      date: format(d, 'MMM dd'),
      averageMood: Number((Math.random() * 2 + 2.5).toFixed(1)), // Between 2.5 and 4.5
      totalCheckins: Math.floor(Math.random() * 500) + 100,
    });
  }
  return data;
};

// --- Global Store for Simulation ---
class MockDataStore {
  users = generateMockUsers();
  conversations = generateMockConversations();
  alerts = generateMockAlerts();
  moodData = generateMockMoodData();
  activeUsersCount = 142;

  listeners: Set<() => void> = new Set();

  constructor() {
    // Simulate real-time data changes
    setInterval(() => {
      this.simulateActivity();
    }, 3000); // Every 3 seconds something might happen
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(l => l());
  }

  simulateActivity() {
    let changed = false;

    // Fluctuate active users slightly
    if (Math.random() > 0.5) {
      this.activeUsersCount += Math.floor(Math.random() * 5) - 2;
      if (this.activeUsersCount < 0) this.activeUsersCount = 0;
      changed = true;
    }

    // Occasionally resolve an old alert
    if (Math.random() > 0.8) {
      const newAlerts = this.alerts.filter(a => a.status === 'new');
      if (newAlerts.length > 0) {
        newAlerts[0].status = 'acknowledged';
        changed = true;
      }
    }
    
    // Very rarely drop a new alert
    if (Math.random() > 0.95) {
      this.alerts.unshift({
        id: `a${Date.now()}`,
        type: Math.random() > 0.5 ? 'crisis' : 'system',
        message: 'New event detected automatically',
        severity: Math.random() > 0.5 ? 'high' : 'medium',
        timestamp: new Date().toISOString(),
        status: 'new'
      });
      changed = true;
    }

    if (changed) {
      this.notify();
    }
  }

  // --- Actions ---
  acknowledgeAlert(id: string) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.status = 'acknowledged';
      this.notify();
    }
  }
  
  resolveAlert(id: string) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.status = 'resolved';
      this.notify();
    }
  }
}

export const mockStore = new MockDataStore();

// --- React Hooks ---

export function useMockStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = mockStore.subscribe(() => {
      setTick(t => t + 1); // Force re-render on data change
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return mockStore;
}
