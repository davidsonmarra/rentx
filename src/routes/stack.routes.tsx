import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '../screens/Splash';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { Confirmation } from '../screens/Confirmation';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { MyCars } from '../screens/MyCars';
import { CarDTO } from '../dtos/CarDTO';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

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

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  Confirmation: ConfirmationProps;
  SchedulingDetails: { car: CarDTO, dates: string[] };
  MyCars: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: UserDataProps };
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Splash'
    >
      <Screen 
        name="Splash"
        component={Splash}
      />
      <Screen 
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />
      <Screen 
        name="SignUpSecondStep"
        component={SignUpSecondStep}
      />
      <Screen 
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false
        }}
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
      <Screen 
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}