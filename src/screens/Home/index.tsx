import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthRootStackParamList } from '../../routes/auth.stack.routes';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';


type Props = StackScreenProps<AuthRootStackParamList, 'Home'>

export function Home({ route, navigation }: Props) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        isMounted && setCars(response.data);
      } catch(error) {
        console.log(error);
      } finally {
        isMounted && setLoading(false);
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
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
    </Container>
  );
}
