import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg'
import { useTheme } from 'styled-components';
import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { 
  Calendar, 
  DayProps, 
  generateInterval,
  MarkedDatesType
} from '../../components/Calendar'
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';
import { format, parseISO } from 'date-fns';

type Props = StackScreenProps<RootStackParamList, 'Scheduling'>;

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

export function Scheduling({ route, navigation }: Props) {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({} as MarkedDatesType)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const theme = useTheme();
  const { car } = route.params;

  function handleConfirmRental() {
    if(!rentalPeriod.start || !rentalPeriod.end) 
      Alert.alert('Selecione o intervalo para alugar.');
    else 
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      });
  }

  function handleBack() {
    navigation.goBack();
  } 

  function handleChangeData(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    if(start.timestamp > end.timestamp) {
      let aux = start;
      start = end;
      end = aux;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(parseISO(firstDate), 'dd/MM/yyyy'),
      endFormatted: format(parseISO(endDate), 'dd/MM/yyyy')
    });
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButton 
          onPress={handleBack} 
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}> 
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeData}
        />
      </Content>
      <Footer>
        <Button 
          title='Confirmar'
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}