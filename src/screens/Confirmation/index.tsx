import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthRootStackParamList } from '../../routes/auth.stack.routes';
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
import { PublicRootStackParamList } from '../../routes/public.routes';

type Props = CompositeScreenProps<
  StackScreenProps<PublicRootStackParamList, 'Confirmation'>,
  StackScreenProps<AuthRootStackParamList, 'Confirmation'>
>;

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