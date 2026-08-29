import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sgl_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('sgl_admin_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adminUser && token) {
      localStorage.setItem('sgl_admin_user', JSON.stringify(adminUser));
      localStorage.setItem('sgl_admin_token', token);
    } else {
      localStorage.removeItem('sgl_admin_user');
      localStorage.removeItem('sgl_admin_token');
    }
  }, [adminUser, token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data.token && data.user) {
        setToken(data.token);
        setAdminUser(data.user);
        return { success: true, user: data.user };
      }
      throw new Error('Authentication failed');
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdminUser(null);
    setToken(null);
    localStorage.removeItem('sgl_admin_user');
    localStorage.removeItem('sgl_admin_token');
  };

  const isAuthenticated = !!token && !!adminUser;

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        token,
        isAuthenticated,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
