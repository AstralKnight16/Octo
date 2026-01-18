import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  login: string;
  avatar_url?: string;
  name?: string;
  bio?: string;
  email?: string;
  location?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  created_at?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadAuth();
  }, []);

  const loadAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('github_token');
      const storedUser = await AsyncStorage.getItem('github_user');
      if (storedToken) {
        setTokenState(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    }
  };

  const setToken = async (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      await AsyncStorage.setItem('github_token', newToken);
    } else {
      await AsyncStorage.removeItem('github_token');
    }
  };

  const logout = async () => {
    setTokenState(null);
    setUser(null);
    await AsyncStorage.removeItem('github_token');
    await AsyncStorage.removeItem('github_user');
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
