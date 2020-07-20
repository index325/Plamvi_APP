import styled from 'styled-components/native';

import { StyleSheet } from 'react-native'

import colors from "../../config/colors";

export const Container = styled.View`
  padding: 5px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${colors.DODGER_BLUE};
  margin-bottom: 12px;
  padding: 12px 0;
  border-radius: 4px;
  border-width: ${StyleSheet.hairlineWidth};
  border-color: rgba(255,255,255,0.7);
`;

export const ButtonText = styled.Text`
  color: ${colors.WHITE};
  text-align: center;
  height: 20px;
`;