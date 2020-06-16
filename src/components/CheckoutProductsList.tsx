import React from "react";
import { View, Text } from "react-native-animatable";
import { TouchableHighlight, StyleSheet, Image } from "react-native";

const CheckoutProductsList: React.FC<any> = (props) => {
  const { data } = props;
  return (
    <View style={styles.item}>
      <Text>{data.quantity}x</Text>
      <Text>{data.product.name}</Text>
      <Text>R${data.product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 4,
        paddingVertical: 10
    }
});

export default CheckoutProductsList;
