import { UserOut } from "./types";

// Define the base URL for API calls
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  full_name?: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

// API endpoints
const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  CURRENT_USER: `${API_BASE_URL}/auth/me`,
  REGISTER: `${API_BASE_URL}/users`,
};

// Storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

// Auth service
export const authService = {
  // Login user
  async login(credentials: LoginRequest): Promise<UserOut> {
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data: TokenResponse = await response.json();
      
      // Store tokens
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
      
      // Get user profile
      return await authService.getCurrentUser();
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Register new user
  async register(userData: RegisterRequest): Promise<UserOut> {
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }

      const user = await response.json();
      
      // Log in with the new credentials
      await authService.login({
        email: userData.email,
        password: userData.password,
      });
      
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  // Get current user
  async getCurrentUser(): Promise<UserOut> {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      
      if (!accessToken) {
        throw new Error('No access token found');
      }
      
      const response = await fetch(ENDPOINTS.CURRENT_USER, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        // If token expired, try to refresh it
        if (response.status === 401) {
          await authService.refreshToken();
          return authService.getCurrentUser();
        }
        
        const error = await response.json();
        throw new Error(error.detail || 'Failed to get user');
      }

      const user = await response.json();
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get user');
    }
  },

  // Refresh token
  async refreshToken(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
      
      const response = await fetch(ENDPOINTS.REFRESH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        // If refresh fails, log the user out
        authService.logout();
        throw new Error('Session expired. Please log in again.');
      }

      const data: TokenResponse = await response.json();
      
      // Update stored tokens
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
    } catch (error: any) {
      authService.logout();
      throw new Error(error.message || 'Token refresh failed');
    }
  },

  // Logout user
  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // Get stored user
  getStoredUser(): UserOut | null {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  },
};

// Helper to get the authentication header for API requests
export const getAuthHeader = (): HeadersInit => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  return {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
};

// API service for authenticated requests
export const apiService = {
  // Generic GET request
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: getAuthHeader(),
      });

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401) {
          await authService.refreshToken();
          return apiService.get(endpoint);
        }
        
        const error = await response.json();
        throw new Error(error.detail || 'Request failed');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'API request failed');
    }
  },

  // Generic POST request
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401) {
          await authService.refreshToken();
          return apiService.post(endpoint, data);
        }
        
        const error = await response.json();
        throw new Error(error.detail || 'Request failed');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'API request failed');
    }
  },

  // Generic PUT request
  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401) {
          await authService.refreshToken();
          return apiService.put(endpoint, data);
        }
        
        const error = await response.json();
        throw new Error(error.detail || 'Request failed');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'API request failed');
    }
  },

  // Generic DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401) {
          await authService.refreshToken();
          return apiService.delete(endpoint);
        }
        
        const error = await response.json();
        throw new Error(error.detail || 'Request failed');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'API request failed');
    }
  },
};