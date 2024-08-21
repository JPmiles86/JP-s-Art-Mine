// my-gallery/src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../utils/store';

interface User {
  userId: number;
  email: string;
  username: string;
  role: string;
  isAnonymous: boolean;
  entityType: string;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
}

interface PersonalContactInfo {
  personContactId: number;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  profession?: string;
  locationId?: number;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  relationshipToArtist?: string;
}

interface OrganizationContactInfo {
  organizationContactId: number;
  userId?: number;
  username?: string;
  organizationName?: string;
  organizationType?: string;
  taxIdNumber?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  locationId?: number;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  contactPersonName?: string;
  contactPersonRole?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
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
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  userOrganizationName: string | null;
  isAnonymous: boolean;
  setIsAnonymous: (value: boolean) => void;
  personalContactInfo: PersonalContactInfo | null;
  setPersonalContactInfo: (info: PersonalContactInfo | null) => void;
  organizationContactInfo: OrganizationContactInfo | null;
  setOrganizationContactInfo: (info: OrganizationContactInfo | null) => void;
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
  userId: null,
  userName: null,
  userEmail: null,
  userFirstName: null,
  userLastName: null,
  userOrganizationName: null,
  isAnonymous: false,
  setIsAnonymous: () => {},
  personalContactInfo: null,
  setPersonalContactInfo: () => {},
  organizationContactInfo: null,
  setOrganizationContactInfo: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userOrganizationName, setUserOrganizationName] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [personalContactInfo, setPersonalContactInfo] = useState<PersonalContactInfo | null>(null);
  const [organizationContactInfo, setOrganizationContactInfo] = useState<OrganizationContactInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login(token); // Use the login function to fetch user data and set authenticated state
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
      setUserId(user.userId);
      setUserName(user.username);
      setUserEmail(user.email);
      setIsAnonymous(user.isAnonymous);
      useStore.getState().setUserId(user.userId);
      useStore.getState().setUserRole(user.role);
      useStore.getState().setIsAnonymous(user.isAnonymous);
      setIsAuthenticated(true);

      if (user.entityType === 'Person') {
        const personInfo = await axios.get(`/api/person-contact-info/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserFirstName(personInfo.data.firstName);
        setUserLastName(personInfo.data.lastName);
        setPersonalContactInfo(personInfo.data);
      } else if (user.entityType === 'Organization') {
        const orgInfo = await axios.get(`/api/organization-contact-info/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserOrganizationName(orgInfo.data.organizationName);
        setOrganizationContactInfo(orgInfo.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    useStore.getState().setUserId(null);
    useStore.getState().setUserRole(null);
    useStore.getState().setIsAnonymous(false);
    setCurrentUser(null);
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    setUserFirstName(null);
    setUserLastName(null);
    setUserOrganizationName(null);
    setIsAnonymous(false);
    setPersonalContactInfo(null); 
    setOrganizationContactInfo(null); 
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        isSignUp,
        setIsSignUp,
        isForgotPassword,
        setIsForgotPassword,
        currentUser,
        setCurrentUser,
        userId,
        userName,
        userEmail,
        userFirstName,
        userLastName,
        userOrganizationName,
        isAnonymous,
        setIsAnonymous,
        personalContactInfo,
        setPersonalContactInfo,
        organizationContactInfo,
        setOrganizationContactInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
