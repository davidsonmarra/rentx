import React, { useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RectButtonProps } from 'react-native-gesture-handler';
import GasolineSvg from '../../assets/gasoline.svg'
import { RootStackParamList } from '../../routes/stack.routes';
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles';

interface CardData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  }
  thumbnail: string;
}

interface Props extends RectButtonProps {
  data: CardData
}

export function Car({ data, ...rest }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => navigation.navigate('CarDetails'), []);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>
      <CarImage 
        source={{ uri: data.thumbnail }} 
        resizeMode='contain'
      />
    </Container>
  );
}