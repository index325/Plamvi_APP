import React, { useContext } from "react";
import { View, Text } from "react-native-animatable";
import { TouchableHighlight, StyleSheet, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import CartContext from "../contexts/Cart";

interface Item {
  product: Product;
  description: string;
  id: number;
  name: string;
  price: number;
}

interface Product {
  name: string;
  price: number;
}

interface Props {
  modalData: (arg0: Item) => void;
  modalVisible: () => void;
  item: Item;
  navigation: NavigationProp<Record<string, object | undefined>>;
  visible: boolean;
}

const ProductFlatList: React.FC<Props> = (props) => {
  const cartContext = useContext(CartContext);

  function handleVisible() {
    props.modalVisible();
  }
  function handleModalData(data: Item) {
    props.modalData(data);
  }

  function handleNavigateToProdutoOverview(id: number) {
    props.navigation.navigate("ProductOverview");
  }

  return (
    <View style={styles.box}>
      <Image
        style={styles.productImage}
        source={require("../assets/images/product.jpg")}
      />
      <View style={styles.productInfo}>
        <View style={styles.productHead}>
          <Text style={styles.productTitle}>{props.item.name}</Text>
          <Text style={styles.productPrice}>R$ {props.item.price}</Text>
        </View>
        <Text>{props.item.description}</Text>
        <TouchableHighlight
          underlayColor="#FAFAFA"
          style={styles.productButton}
          onPress={() => {
            handleNavigateToProdutoOverview(props.item.id);
          }}
        >
          <Text style={styles.productButtonText}>Ver Detalhes</Text>
        </TouchableHighlight>
        {cartContext.cart.opened ? (
          <TouchableHighlight
            underlayColor="#FAFAFA"
            style={styles.productButton}
            onPress={() => {
              handleModalData(props.item);
              handleVisible();
            }}
          >
            <Text style={styles.productButtonText}>Comprar</Text>
          </TouchableHighlight>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
  },
  list: {
    padding: 20,
  },
  productHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "center",
  },
  box: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 15,
  },
  productPrice: {
    alignSelf: "flex-start",
    flexDirection: "column",
  },
  productImage: {
    borderRadius: 1000,
    // flex: 1,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DA552F",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  productButtonText: {
    fontSize: 16,
    color: "#DA552F",
    fontWeight: "bold",
  },
});

export default ProductFlatList;
