import styled from 'styled-components/native';

import { StyleSheet } from "react-native";

import colors from "../../config/colors";

interface ButtonProps {
  disabled?: boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.disabled ? colors.WHITE : colors.DODGER_BLUE};
    margin-bottom: 12px;
    padding: 12px 0;
    border-radius: 4px;
    border-width: ${StyleSheet.hairlineWidth};
    border-color: ${props => props.disabled ? "black" : "rgba(255,255,255,0.7)"};
`;

export const ButtonText = styled.Text<ButtonProps>`
  color: ${props => props.disabled ? colors.WHITE : colors.BLACK};
  text-align: center;
  height: 20px;
`;