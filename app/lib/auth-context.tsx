'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from './api';
import type { AuthContextType, User } from './types';
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isAuthenticated = !!user;
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);
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
