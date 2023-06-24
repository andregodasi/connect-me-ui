import { toast } from 'react-toastify';
import { getAPIClient } from './axios';
import Router from 'next/router';
import { parseCookies } from 'nookies';

export const api = getAPIClient();

const formatMessage = (
  message: string | string[] | undefined,
  defaultMessage: string,
) => {
  if (!message) {
    return defaultMessage;
  }
  if (message instanceof Array) {
    return (
      <ul>
        {message.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    );
  }

  return message;
};

// request interceptor
api.interceptors.request.use((config: any) => {
  if (config?.headers?.common['Authorization']) {
    return config;
  }

  const { ['connect.token']: token } = parseCookies();
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
api.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    toast.error(data?.msg || 'Error');

    if (response.status === 401) {
      Router.push('/login');
    }

    return Promise.reject(new Error(response.statusText || 'Error'));
  },
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          toast.warn(
            formatMessage(
              error.response.data?.message,
              'Você não tem autorização para acessar essa página.',
            ),
          );

          Router.push('/login');
          break;
        case 403:
          toast.warn(
            formatMessage(
              error.response.data?.message,
              'Você não tem permissão para acessar essa página',
            ),
          );
          Router.push('/login');
          break;

        case 404:
          toast.warn('Não foi possível encontrar a página solicitada');
          Router.push('/404');
          break;
        case 406:
          toast.warn('Sua requisição não foi aceita pelo servidor');
          break;
        default:
          toast.error(
            formatMessage(
              error.response.data?.message,
              'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.',
            ),
          );
      }
    }

    // throw new Error(error);
    return Promise.reject(error);
  },
);
