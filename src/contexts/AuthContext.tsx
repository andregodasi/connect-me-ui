import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { recoverUserInformation, signInRequest } from '../services/auth';
import { api } from '../services/api';

type User = {
  uuid: string;
  name: string;
  email: string;
  photoUrl: string;
};

export type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
  refreshUserInformation: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'connect.token': token } = parseCookies();

    if (token) {
      refreshUserInformation();
    }
  }, []);

  async function refreshUserInformation() {
    recoverUserInformation().then((response) => {
      setUser(response.user);
    });
  }

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, 'connect.token', token, {
      maxAge: 24 * 60 * 60 * 30, // 30 days
    });

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setUser(user);

    Router.push('/dashboard');
  }

  function signOut() {
    setUser(null);
    setCookie(undefined, 'connect.token', '', {
      maxAge: -1,
    });

    Router.push('/');
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, refreshUserInformation }}
    >
      {children}
    </AuthContext.Provider>
  );
}
