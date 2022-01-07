import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { Confirmation } from '../screens/Confirmation';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { CarDTO } from '../dtos/CarDTO';

export interface UserDataProps {
  name: string;
  email: string;
  driverLicense: string;
}

interface ConfirmationProps {
  title: string;
  message: string;
  nextScreenRoute: 'Home' | 'Splash';
}

export type AuthRootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  Confirmation: ConfirmationProps;
  SchedulingDetails: { car: CarDTO, dates: string[] };
};

const { Navigator, Screen } = createStackNavigator<AuthRootStackParamList>();

export function AuthRoutesStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Home'
    >
      <Screen 
        name="Home"
        component={Home}
      />
      <Screen 
        name="CarDetails"
        component={CarDetails}
      />
      <Screen 
        name="Scheduling"
        component={Scheduling}
      />
      <Screen 
        name="Confirmation"
        component={Confirmation}
      />
      <Screen 
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
    </Navigator>
  )
}