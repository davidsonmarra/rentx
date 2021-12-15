import React from 'react';
import { SvgProps } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Name
} from './styles';

interface Props {
  name: string;
  icon: React.FC<SvgProps>
}

export function Acessory({
  name, 
  icon: Icon
}: Props) {
  return (
    <Container>
      <Icon width={RFValue(32)} height={RFValue(32)} />
      <Name>{name}</Name>
    </Container>
  );
}