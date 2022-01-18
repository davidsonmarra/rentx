import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthRootStackParamList } from '../../routes/auth.stack.routes';
import { useTheme } from 'styled-components';
import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { parseISO, format } from 'date-fns';
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles';
import api from '../../services/api';
import { Alert } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import { useNetInfo } from '@react-native-community/netinfo';

type Props = StackScreenProps<AuthRootStackParamList, 'SchedulingDetails'>;

export function SchedulingDetails({ route, navigation }: Props) {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { car, dates } = route.params;
  const netInfo = useNetInfo();
  
  async function handleConfirmRental() {
    setLoading(true);
    
    await api.post(`/rentals`, {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: Number(dates.length * car.price)
    })
    .then(() => navigation.navigate('Confirmation', {
      title: 'Carro alugado!',
      message: 'Agora você só precisa ir\naté a concessionária da RENTX\npegar seu automóvel.',
      nextScreenRoute: 'Home'
    }))
    .catch((error) => {
      console.log(error)
      Alert.alert('Não foi possível confirmar o agendamento.');
    })
    .finally(() => setLoading(false));
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }
    if(netInfo.isConnected === true) 
      fetchCarUpdated();
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider 
          imagesUrl={
            !!carUpdated.photos ?
            carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${car.price.toLocaleString()}`}</Price>
          </Rent>
        </Details>
        <Accessories>
        {
          carUpdated.accessories &&
          <Accessories>
            {
              carUpdated.accessories.map(accessory => 
                <Acessory 
                  key={accessory.type}
                  name={accessory.name} 
                  icon={getAccessoryIcon(accessory.type)}
                />
              )
            }
          </Accessories>
        }
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>
              {
                format(parseISO(dates[0]), 'dd/MM/yyyy')
              }
            </DateValue>
          </DateInfo>
          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>
              {
                format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy')
              }
            </DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>
              {
                `R$ ${(car.price*dates.length).toLocaleString()}`
              }</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button 
          title='Alugar agora'  
          color={theme.colors.success}
          onPress={handleConfirmRental}  
          loading={loading}
        />
      </Footer>
    </Container>
  );
}