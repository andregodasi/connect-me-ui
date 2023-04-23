import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import { decodeToken } from 'react-jwt';

interface CurrentUser {
  sub: string;
  name: string;
  email: string;
}

export const getCurrentUser = (ctx: GetServerSidePropsContext): CurrentUser => {
  const { 'connect.token': token } = parseCookies(ctx);
  const currentUser = decodeToken(token) as CurrentUser;

  return currentUser;
};
