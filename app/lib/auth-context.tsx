'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { authAPI } from './api';
import type { AuthContextType, User } from './types';

interface JwtPayload {
  exp: number;
  iat: number;
  [key: string]: unknown;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true;
  }
};

const getTokenExpiryTime = (token: string): number | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

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

  // Check if token is expired
  if (isTokenExpired(token)) {
    console.log('Token expired, clearing storage');
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('user');
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

  // Auto-logout when token expires
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      if (isTokenExpired(token)) {
        console.log('Token expired, logging out');
        toast.error('Your session has expired. Please sign in again.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/auth/sign-in');
        return;
      }

      const expiryTime = getTokenExpiryTime(token);
      if (!expiryTime) return;

      const timeUntilExpiry = expiryTime - Date.now();

      // Set timeout to logout when token expires
      if (timeUntilExpiry > 0) {
        const timeoutId = setTimeout(() => {
          toast.error('Your session has expired. Please sign in again.');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setUser(null);
          router.push('/auth/sign-in');
        }, timeUntilExpiry);

        return () => clearTimeout(timeoutId);
      }
    };

    checkTokenExpiry();
  }, [user, router]);
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
