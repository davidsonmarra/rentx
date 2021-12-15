import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface IndexImageProps {
  active?: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<IndexImageProps>`
  width: ${RFValue(6)}px;
  height: ${RFValue(6)}px;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.title : theme.colors.shape
  };
  margin-right: 8px;
  border-radius: ${RFPercentage(50)}px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(132)}px;
  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
