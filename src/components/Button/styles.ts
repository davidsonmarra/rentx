import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

interface ButtonProps {
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  opacity: ${({ enabled, loading }) => enabled || loading ? 1 : .5};
  margin-bottom: 8px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
`;