import { api } from './api';
import { decodeToken } from 'react-jwt';

type SignInRequestData = {
  email: string;
  password: string;
};

type User = {
  uuid: string;
  name: string;
  email: string;
  photoUrl: string;
};

export async function signInRequest(data: SignInRequestData) {
  const response = await api.post('/login', data);
  const { access_token: token } = response.data;
  const user: User = decodeToken(token) as User;

  return {
    token,
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

export async function forgotPasswordRequest(email: string) {
  await api.post(`/recovery-password?user_email=${email}`);
}

export async function recoveryPasswordRequest(
  uuid: string,
  newPassword: string,
) {
  await api.put(`/recovery-password/${uuid}`, { newPassword });
}
