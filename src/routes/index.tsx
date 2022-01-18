import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import { AuthTabRoutes } from './auth.tab.routes';
import { PublicRoutes } from './public.routes';
import { LoadAnimation } from '../components/LoadAnimation';

export function Routes() {
  const { user, loading } = useAuth();
  return (
    loading ? <LoadAnimation /> :
    <NavigationContainer>
      {
        user.id ? <AuthTabRoutes /> : <PublicRoutes />
      }
    </NavigationContainer>
  );
}