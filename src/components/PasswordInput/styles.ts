import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View<Props>`
  width: ${RFValue(55)}px;
  height: ${RFValue(56)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocused }) => isFocused
    ? theme.colors.main : 'transparent'
  };
`;

export const InputText = styled.TextInput<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocused }) => isFocused
    ? theme.colors.main : 'transparent'
  };
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)``;