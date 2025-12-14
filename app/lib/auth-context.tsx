'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { authAPI } from './api';
import type { AuthContextType, SignUpResult, User } from './types';

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

type AuthPayload = Record<string, unknown>;

const unwrapDataLayer = (payload: unknown): AuthPayload => {
  let current: unknown = payload;
  while (
    current &&
    typeof current === 'object' &&
    !Array.isArray(current) &&
    'data' in (current as Record<string, unknown>)
  ) {
    const next = (current as Record<string, unknown>).data;
    if (!next || typeof next !== 'object' || Array.isArray(next)) {
      break;
    }
    current = next;
  }

  return current && typeof current === 'object' && !Array.isArray(current)
    ? (current as AuthPayload)
    : {};
};

const extractAuthSession = (payload: unknown): { token: string | null; user: User | null } => {
  const normalized = unwrapDataLayer(payload) as Record<string, any>;

  const tokenCandidates = [
    normalized.accessToken,
    normalized.token,
    normalized.access_token,
    normalized?.access?.token,
    normalized?.authToken,
    normalized?.tokens?.accessToken,
    normalized?.tokens?.access?.token,
    normalized?.tokens?.token,
  ];

  const token = tokenCandidates.find((candidate) => typeof candidate === 'string' && candidate.length > 0) ?? null;

  const possibleUsers = [normalized.user, normalized.profile, normalized.account];
  const user = possibleUsers.find((candidate) => candidate && typeof candidate === 'object') ?? null;

  return {
    token: token as string | null,
    user: (user as User) ?? null,
  };
};

const persistSession = (token: string, userData: User) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(userData));
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const router = useRouter();
  const isAuthenticated = !!user;
  const isLoading = false;
  const startSession = (token: string, sessionUser: User) => {
    persistSession(token, sessionUser);
    setUser(sessionUser);
  };

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
    const payload = await authAPI.signIn(email, password);
    const { token, user: sessionUser } = extractAuthSession(payload);

    if (!token || !sessionUser) {
      throw new Error('Invalid response from server');
    }

    startSession(token, sessionUser);
    router.push('/dashboard');
  };
  const signUp = async (name: string, email: string, password: string): Promise<SignUpResult> => {
    const payload = await authAPI.signUp(name, email, password);
    const { token, user: sessionUser } = extractAuthSession(payload);

    if (token && sessionUser) {
      startSession(token, sessionUser);
      router.push('/dashboard');
      return 'authenticated';
    }

    try {
      const loginPayload = await authAPI.signIn(email, password);
      const { token: loginToken, user: loginUser } = extractAuthSession(loginPayload);
      if (loginToken && loginUser) {
        startSession(loginToken, loginUser);
        router.push('/dashboard');
        return 'authenticated';
      }
    } catch (error) {
      console.warn('Auto sign-in after registration failed:', error);
    }

    router.push('/auth/sign-in');
    return 'needs-sign-in';
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
