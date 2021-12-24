import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import Logo from '../../assets/logo.svg';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../routes/stack.routes';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home({ route, navigation }: Props) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) { 
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  return (
    <Container>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {
            !loading &&
            <TotalCars>Total de {cars.length} carros</TotalCars>
          }
        </HeaderContent>
      </Header>
      {
        loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          renderItem={({ item }) =>
            <Car 
              data={item} 
              onPress={() => handleCarDetails(item)}
            />
          }
          keyExtractor={item => item.id}
        />
      }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated 
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}
          >
            <Ionicons 
              size={32} 
              name='ios-car-sport' 
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})