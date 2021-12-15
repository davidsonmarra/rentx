import React from 'react';
import { StatusBar } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Container,
  Title
} from './styles';

interface Props extends RectButtonProps {
  title: string;
}

export function ConfirmButton({
  title,
  ...rest
}: Props) {
  return (
    <Container {...rest}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Title>{title}</Title>
    </Container>
  );
}