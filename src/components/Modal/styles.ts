import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;
export const Content = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  width: 95%;
`;

export const CloseModalButton = styled.TouchableHighlight`
  margin: 0;
  display: flex;
  align-self: flex-end;
  bottom: 20;
`
export const OpenButton = styled.TouchableHighlight`
  background-color: #2196F3;
  border-radius: 20px;
  padding: 10px;
`;

export const IconContainer = styled.View``;

export const ModalText = styled.Text`
  margin-bottom: 15px;
  text-align: center;
`;

export const FooterText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;