// my-gallery/src/contexts/AuthContext.tsx

import { String } from 'lodash';
import React, { createContext, useContext, useState, useEffect } from 'react';
import useStore from '../utils/store';
import axios from 'axios';

interface User {
  userId: number;
  email: string;
  username: string;
  role: string;
  isAnonymous: boolean;
}

interface AuthContextData {
    isAuthenticated: boolean;
    isSignUp: boolean;
    isForgotPassword: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setIsSignUp: (value: boolean) => void;
    setIsForgotPassword: (value: boolean) => void;
    login: (token: string) => void;
    logout: () => void;
    currentUser: User | null; 
    setCurrentUser: (user: User | null) => void; 
  }

  const AuthContext = createContext<AuthContextData>({
    isAuthenticated: false,
    isSignUp: false,
    isForgotPassword: false,
    setIsAuthenticated: () => {},
    setIsSignUp: () => {},
    setIsForgotPassword: () => {},
    login: () => {},
    logout: () => {},
    currentUser: null, 
    setCurrentUser: () => {}, 
  });
  
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data.user;
      setCurrentUser(user);
      useStore.getState().setUserId(user.userId);
      useStore.getState().setUserRole(user.role);
      useStore.getState().setIsAnonymous(user.isAnonymous);
      console.log('User data fetched:', user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    console.log('Token stored in localStorage:', token);
    setIsAuthenticated(true);
    fetchUserData(token);
    console.log('User logged in');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    useStore.getState().setUserId(null);
    useStore.getState().setUserRole(null);
    useStore.getState().setIsAnonymous(false);
    setCurrentUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, isSignUp, setIsSignUp, isForgotPassword, setIsForgotPassword, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};