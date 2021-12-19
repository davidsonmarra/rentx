import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

interface ButtonProps extends RectButtonProps {
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  opacity: ${({ enabled, loading }) => enabled || loading ? 1 : .5};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`;