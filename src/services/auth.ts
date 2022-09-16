import { v4 as uuid } from 'uuid';
import { api } from './api';
import { decodeToken } from 'react-jwt';

type SignInRequestData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  const response = await api.post('/login', data);

  const { access_token: token } = response.data;
  const user: User = decodeToken(token) as User;

  return {
    token: token,
    user: {
      ...user,
    },
  };
}

export async function recoverUserInformation() {
  const response = await api.get('/me');

  return {
    user: {
      ...response.data,
    },
  };
}
