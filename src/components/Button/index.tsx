import React from 'react';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Container,
  Title
} from './styles';
import { ActivityIndicator } from 'react-native';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <Container 
      color={color ? color : theme.colors.main} 
      {...rest}
      enabled={enabled && !loading}
    >
      {
        loading ? 
        <ActivityIndicator color={theme.colors.shape} /> :
        <Title>{title}</Title>
      }
    </Container>
  );
}