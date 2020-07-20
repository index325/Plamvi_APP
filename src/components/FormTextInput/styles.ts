import styled from 'styled-components/native';
import { StyleSheet } from "react-native";
import colors from "../../config/colors";

export const Input = styled.TextInput`
  height: 40px;
  border-color: ${colors.SILVER};
  border-bottom-width: ${StyleSheet.hairlineWidth};
  margin-bottom: 5px;
`;