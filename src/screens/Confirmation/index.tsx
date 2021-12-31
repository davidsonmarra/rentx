import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/stack.routes';
import { StatusBar, useWindowDimensions } from 'react-native';
import { ConfirmButton } from '../../components/ConfirmButton';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

type Props = StackScreenProps<RootStackParamList, 'Confirmation'>;

export function Confirmation({ route, navigation }: Props) {
  const { title, message, nextScreenRoute } = route.params;
  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg 
          width={RFValue(80)}
          height={RFValue(80)}
        />
        <Title>{title}</Title>
        <Message>
          {message}
        </Message>
      </Content>
      <Footer>
        <ConfirmButton 
          title='OK'
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}