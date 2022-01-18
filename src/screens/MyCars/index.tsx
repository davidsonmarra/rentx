import React, { useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AuthRootTabParamList } from '../../routes/auth.tab.routes';
import { useTheme  } from 'styled-components';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/model/Car'
import api from '../../services/api';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { format, parseISO } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

type Props = BottomTabScreenProps<AuthRootTabParamList, 'MyCars'>;

export function MyCars({ route, navigation }: Props) {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  } 

  useFocusEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/rentals`);
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          }
        })
        setCars(dataFormatted);
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  })

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
          Seus agendamentos {'\n'}
          estão aqui
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>
      {
        loading ? <LoadAnimation /> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <CarWrapper>
                  <Car data={item.car}/>
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.start_date}</CarFooterDate>
                      <AntDesign 
                        name='arrowright'
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.end_date}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>  
              )
            }}
          />
        </Content>
      }
    </Container>
  );
}