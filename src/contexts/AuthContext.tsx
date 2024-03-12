// my-gallery/src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface AuthContextData {
    isAuthenticated: boolean;
    isSignUp: boolean;
    isForgotPassword: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setIsSignUp: (value: boolean) => void;
    setIsForgotPassword: (value: boolean) => void;
    login: (token: string) => void;
    logout: () => void;
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
  });
  
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
    const login = (token: string) => {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, isSignUp, setIsSignUp, isForgotPassword, setIsForgotPassword }}>
        {children}
      </AuthContext.Provider>
    );
  };