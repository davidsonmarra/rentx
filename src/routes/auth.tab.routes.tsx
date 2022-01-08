import React from 'react';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthRootStackParamList, AuthRoutesStack } from './auth.stack.routes'; 
import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg'
import { NavigatorScreenParams } from '@react-navigation/native';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Platform } from 'react-native';
import { Profile } from '../screens/Profile';

export type AuthRootTabParamList = {
  AuthRoutesStack: NavigatorScreenParams<AuthRootStackParamList>;
  Profile: undefined;
  MyCars: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AuthRootTabParamList>();

export function AuthTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          padding: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary
        }
      }}
    >
      <Screen 
        name="AuthRoutesStack"
        component={AuthRoutesStack}
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ))          
        }}
      />
      <Screen 
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ))          
        }}
      />
      <Screen 
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ))          
        }}
      />
    </Navigator>
  )
}