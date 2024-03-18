// my-gallery/src/contexts/AuthContext.tsx

import { String } from 'lodash';
import React, { createContext, useContext, useState } from 'react';
import useStore from '../utils/store';

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

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    useStore.getState().setUserId(null);
    useStore.getState().setUserRole(null); 
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, isSignUp, setIsSignUp, isForgotPassword, setIsForgotPassword, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};