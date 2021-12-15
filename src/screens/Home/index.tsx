import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../routes/stack.routes';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export function Home({ route, navigation }: Props) {

  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://production.autoforce.com/uploads/version/profile_image/3188/model_main_comprar-tiptronic_87272c1ff1.png'
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

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
      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({ item }) =>
          <Car 
            data={carData} 
            onPress={handleCarDetails}
          />
        }
        keyExtractor={item => String(item)}
      />
    </Container>
  );
}