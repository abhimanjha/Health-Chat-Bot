import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "@health_ai_users";
const CURRENT_USER_KEY = "@health_ai_current_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (userJson) setUser(JSON.parse(userJson));
    } catch {}
    setIsLoading(false);
  }

  async function signIn(email: string, password: string) {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users: Record<string, { user: User; password: string }> = usersJson
      ? JSON.parse(usersJson)
      : {};
    const entry = users[email.toLowerCase()];
    if (!entry) throw new Error("No account found with this email.");
    if (entry.password !== password) throw new Error("Incorrect password.");
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(entry.user));
    setUser(entry.user);
  }

  async function signUp(name: string, email: string, password: string) {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users: Record<string, { user: User; password: string }> = usersJson
      ? JSON.parse(usersJson)
      : {};
    const key = email.toLowerCase();
    if (users[key]) throw new Error("An account with this email already exists.");
    const newUser: User = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
      name,
      email: key,
      joinedAt: new Date().toISOString(),
    };
    users[key] = { user: newUser, password };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }

  async function signOut() {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }

  async function updateUser(updates: Partial<User>) {
    if (!user) return;
    const updated = { ...user, ...updates };
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users: Record<string, { user: User; password: string }> = usersJson
      ? JSON.parse(usersJson)
      : {};
    if (users[user.email]) {
      users[user.email].user = updated;
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
    setUser(updated);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signIn, signUp, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
