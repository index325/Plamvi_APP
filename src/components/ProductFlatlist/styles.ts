import styled from 'styled-components/native';

export const Container  = styled.View`
  padding: 20px;
  background-color: white;
  flex-direction: row;
  border-width: 1px;
  border-color: #DDD;
  margin-bottom: 15px;
`;

export const ProductImage = styled.Image`
  border-radius: 1000px;
  width: 100px;
  height: 100px;
  align-self: center;
`;

export const ProductInfo = styled.View`
  flex: 1;
  margin-left: 10px;
  align-self: center;
`;

export const ProductInfoHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ProductTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  flex: 1;
`;

export const ProductPrice = styled.Text`
  align-self: flex-start;
  flex-direction: column;
`;

export const ItemDescription = styled.Text`
  font-size: 16px;
  color: #999;
  margin-top: 5px;
  line-height: 24px;
`;

export const ProductButton = styled.TouchableHighlight`
  height: 42;
  border-radius: 5px;
  border-width: 2px;
  border-color: #DA552F;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
`;

export const ProductButtonText = styled.Text`
  font-size: 16px;
  color: #DA552F;
  font-weight: bold;
`;