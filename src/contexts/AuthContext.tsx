import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';

import {
  recoverUserInformation,
  signInRequest,
  recoveryPasswordRequest,
  forgotPasswordRequest,
} from '../services/auth';
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
  forgotPassword: (email: string) => Promise<void>;
  recoveryPassword: (uuid: string, newPassword: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    // eslint-disable-next-line no-useless-computed-key
    const { ['connect.token']: token } = parseCookies();
    if (token) {
      // eslint-disable-next-line dot-notation
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      maxAge: 24 * 60 * 60 * 30, // 30 days,
      path: '/',
    });

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(user);

    router.push('/dashboard');
  }

  async function forgotPassword(email: string) {
    await forgotPasswordRequest(email);
  }

  async function recoveryPassword(uuid: string, newPassword: string) {
    await recoveryPasswordRequest(uuid, newPassword);
  }

  function signOut() {
    setUser(null);
    setCookie(undefined, 'connect.token', '', {
      maxAge: -1,
      path: '/',
    });

    router.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        refreshUserInformation,
        forgotPassword,
        recoveryPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
