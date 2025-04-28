"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { authService } from "@/lib/api-service";
import { User } from "@/lib/types";

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; username: string; full_name?: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the auth context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        // Check if we have a stored token
        if (authService.isAuthenticated()) {
          // If we have a token, try to get the current user
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // If there's an error, clear any invalid auth state
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.login({ email, password });
      setUser(loggedInUser);
    } catch (error: any) {
      setError(error.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: { email: string; username: string; full_name?: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
    } catch (error: any) {
      setError(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Value object to provide
  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};