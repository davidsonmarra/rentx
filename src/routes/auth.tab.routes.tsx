import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthRootStackParamList, AuthRoutesStack } from './auth.stack.routes'; 
import { NavigatorScreenParams } from '@react-navigation/native';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';

export type AuthRootTabParamList = {
  AuthRoutesStack: NavigatorScreenParams<AuthRootStackParamList>;
  Profile: undefined;
  MyCars: undefined;
};



const { Navigator, Screen } = createBottomTabNavigator<AuthRootTabParamList>();

export function AuthTabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen 
        name="AuthRoutesStack"
        component={AuthRoutesStack}
      />
      <Screen 
        name="Profile"
        component={Home}
      />
      <Screen 
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}