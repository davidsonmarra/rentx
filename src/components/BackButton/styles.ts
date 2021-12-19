import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(BorderlessButton)`
  width: ${RFValue(24)}px;
`;