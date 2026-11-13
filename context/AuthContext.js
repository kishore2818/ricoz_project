'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthContext = createContext(null);
const PUBLIC_ROUTES = ['/', '/login', '/register'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (
      savedToken &&
      savedToken !== 'undefined' &&
      savedToken !== 'null' &&
      savedUser &&
      savedUser !== 'undefined' &&
      savedUser !== 'null'
    ) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!loading && !token && !isPublicRoute) {
      router.replace('/login');
    }
  }, [loading, token, isPublicRoute, router]);

  const login = useCallback(async (email, password) => {
    const res = await apiLogin(email, password);
    const payload = res?.data || res;
    const tok = payload?.token;
    const usr = payload?.user;
    if (!tok || !usr) {
      throw new Error('Invalid authentication response from server');
    }
    localStorage.setItem('token', tok);
    localStorage.setItem('user', JSON.stringify(usr));
    setToken(tok);
    setUser(usr);
    return res;
  }, []);

  const register = useCallback(async (userData) => {
    const res = await apiRegister(userData);
    const payload = res?.data || res;
    const tok = payload?.token;
    const usr = payload?.user;
    if (!tok || !usr) {
      throw new Error('Invalid registration response from server');
    }
    localStorage.setItem('token', tok);
    localStorage.setItem('user', JSON.stringify(usr));
    setToken(tok);
    setUser(usr);
    return res;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    router.push('/login');
  }, [router]);

  const shouldBlockProtectedRender = !isPublicRoute && (loading || !token);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {shouldBlockProtectedRender ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="text-sm font-medium text-gray-500">Verifying session...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
