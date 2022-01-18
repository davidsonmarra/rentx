import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '../screens/Splash';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { Confirmation } from '../screens/Confirmation';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { CarDTO } from '../dtos/CarDTO';
import { Car as ModelCar } from '../database/model/Car';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AuthRootTabParamList } from './auth.tab.routes';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';

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
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: ModelCar };
  Scheduling: { car: CarDTO };
  Confirmation: ConfirmationProps;
  SchedulingDetails: { car: CarDTO, dates: string[] };
};

const { Navigator, Screen } = createStackNavigator<AuthRootStackParamList>();

type Props = BottomTabScreenProps<AuthRootTabParamList, 'AuthRoutesStack'>;

export function AuthRoutesStack({ navigation, route }: Props) {
  const theme = useTheme();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if(routeName === 'Splash' || !routeName) 
      navigation.setOptions({ tabBarStyle: { display: 'none' }});
    else 
      navigation.setOptions({ tabBarStyle: {
        padding: Platform.OS === 'ios' ? 20 : 0,
        height: 78,
        backgroundColor: theme.colors.background_primary
      }});
  }, [navigation, route])
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