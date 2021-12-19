import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';
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

type Props = StackScreenProps<RootStackParamList, 'SchedulingDetails'>;

export function SchedulingDetails({ route, navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { car, dates } = route.params;
  
  async function handleConfirmRental() {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates, 
      ...dates
    ];
    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(parseISO(dates[0]), 'dd/MM/yyyy'),
      endDate: format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy')
    })
    await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => navigation.navigate('SchedulingComplete'))
    .catch((error) => Alert.alert('Não foi possível confirmar o agendamento.'))
    .finally(() => setLoading(false));
  }

  function handleBack() {
    navigation.goBack();
  } 

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price.toLocaleString()}`}</Price>
          </Rent>
        </Details>
        <Accessories>
        {
            car.accessories.map(accessory => 
              <Acessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />
            )
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
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>
              {
                `R$ ${(car.rent.price*dates.length).toLocaleString()}`
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