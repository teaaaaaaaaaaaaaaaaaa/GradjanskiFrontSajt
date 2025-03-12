import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll simulate a successful login
      // In a real app, this would make an API call to authenticate
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        firstName: 'Demo',
        lastName: 'User',
        location: 'Beograd',
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError('Greška prilikom prijave. Pokušajte ponovo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll simulate a successful registration
      // In a real app, this would make an API call to register the user
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user with generated ID
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        location: userData.location,
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      setError('Greška prilikom registracije. Pokušajte ponovo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 