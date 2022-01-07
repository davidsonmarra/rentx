import React, { useEffect, useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AuthRootTabParamList } from '../../routes/auth.tab.routes';
import { useTheme  } from 'styled-components';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { CarDTO } from '../../dtos/CarDTO';
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

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

type Props = BottomTabScreenProps<AuthRootTabParamList, 'MyCars'>;

export function MyCars({ route, navigation }: Props) {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  } 

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser/?user_id=1`);
        setCars(response.data);
        console.log(response.data)
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [])

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
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign 
                        name='arrowright'
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
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