import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(227)}px;
  padding: 0 19px;
  background-color: ${({ theme }) => theme.colors.header};
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 48px;

`;

export const Photo = styled.Image`
  flex: 1;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  position: absolute;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.main};
  right: 10px;
  bottom: 10px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;
  ${({ active }) => active && css`
    border-bottom-width: 3px;
    border-bottom-color: ${({ theme }) => theme.colors.main};
  `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-family: ${({ theme, active }) => active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, active }) => active ? theme.colors.header : theme.colors.text_detail};
`;

export const Section = styled.View``;