'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from './api';
import type { AuthContextType, User } from './types';

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = window.localStorage.getItem('authToken');
  const savedUser = window.localStorage.getItem('user');

  if (!token || !savedUser) {
    if (!token) {
      window.localStorage.removeItem('user');
    }
    return null;
  }

  try {
    return JSON.parse(savedUser) as User;
  } catch (error) {
    console.error('Failed to parse user data:', error);
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('user');
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const router = useRouter();
  const isAuthenticated = !!user;
  const isLoading = false;
  const signIn = async (email: string, password: string) => {
    const data = await authAPI.signIn(email, password);
    console.log('Sign in response:', data);
    const responseData = data.data || data;
    const token = responseData.accessToken || responseData.token || data.accessToken;
    const userData = responseData.user || data.user;
    console.log('Token:', token);
    console.log('User data:', userData);
    if (!token || !userData) {
      throw new Error('Invalid response from server');
    }
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    router.push('/dashboard');
  };
  const signUp = async (name: string, email: string, password: string) => {
    const data = await authAPI.signUp(name, email, password);
    console.log('Sign up response:', data);
    const responseData = data.data || data;
    const token = responseData.accessToken || responseData.token || data.accessToken;
    const userData = responseData.user || data.user;
    console.log('Token:', token);
    console.log('User data:', userData);
    if (!token || !userData) {
      throw new Error('Invalid response from server');
    }
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    router.push('/dashboard');
  };
  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/sign-in');
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
      }}
    >
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
