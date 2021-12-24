import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '../screens/Splash';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { MyCars } from '../screens/MyCars';
import { CarDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingComplete: undefined;
  SchedulingDetails: { car: CarDTO, dates: string[] };
  MyCars: undefined;
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
        name="SchedulingComplete"
        component={SchedulingComplete}
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