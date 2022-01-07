import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '../screens/Splash';
import { Confirmation } from '../screens/Confirmation';
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

export type PublicRootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: UserDataProps };
  Confirmation: ConfirmationProps;
};

const { Navigator, Screen } = createStackNavigator<PublicRootStackParamList>();

export function PublicRoutes() {
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
        name="SignIn"
        component={SignIn}
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
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  )
}