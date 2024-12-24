import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Router } from 'next/router';
import { AuthProvider } from '../contexts/AuthContext';
import LoadingOverlay from '@/components/shared/LoadingOverlay';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <AuthProvider>
      <LoadingOverlay isLoading={isLoading} />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;