import React from 'react';
import 'focus-visible';
import '@/styles/tailwind.css';
import '../../public/antd.min.css';
import '@/styles/global.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.min.css';
import withTheme from '@/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 0,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return withTheme(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <ToastContainer transition={Slide} />
          <Component {...pageProps} />
        </AuthProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
