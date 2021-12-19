import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car } from '../../components/Car';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../routes/stack.routes';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';
import { Load } from '../../components/Load';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export function Home({ route, navigation }: Props) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

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
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {
        loading ? <Load /> :
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
      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
          size={32} 
          name='ios-car-sport' 
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}