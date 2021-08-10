import React, { Component } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import BasketProduct from "../Components/BasketProductList";
import MenuItems from "../Components/MenuItems";
import staticPages from "../Components/staticPages.json";
import { abs } from "react-native-reanimated";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class BasketScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.navigation.state.params.products,
      totalPrice: this.props.navigation.state.params.totalPrice,
      checkchange: false,
      isPressedBefore: false,
    };
    console.log(
      this.state.products,
      "--------------------------------------------------------------"
    );
    console.log(this.props.navigation.state.params.products);
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    this.setTotalPrice = this.setTotalPrice.bind(this);
    this.deleteProductFromBasket = this.deleteProductFromBasket.bind(this);
    this.setProductLastProduct = this.setProductLastProduct.bind(this);
  }

  rerenderParentCallback() {
    this.forceUpdate();
  }

  setTotalPrice(price) {
    this.setState({ totalPrice: price });
    console.log(this.state.totalPrice);
  }

  setProductLastProduct(newProducts) {
    this.setState({
      products: newProducts,
    });
    this.state.checkchange
      ? this.setState({ checkchange: false })
      : this.setState({ checkchange: true });
  }

  deleteProductFromBasket(id) {
    var newProducts = this.state.products.filter((a) => a.product !== id);
    this.setState({
      products: newProducts,
    });
    this.state.checkchange
      ? this.setState({ checkchange: false })
      : this.setState({ checkchange: true });
  }
  checkoutPressed() {
    console.log("Basket// ispressed:", this.state.isPressedBefore)
    if (this.state.isPressedBefore && this.state.totalPrice != 0) {
      this.props.navigation.push("Checkout", {
        products: this.state.products,
        totalPrice: this.state.totalPrice,
      });
    } else if (!this.state.isPressedBefore && this.state.totalPrice != 0) {
      this.setState({
        isPressedBefore: true,
      });
      this.props.navigation.navigate("Checkout", {
        products: this.state.products,
        totalPrice: this.state.totalPrice,
      });
    }
  }
  render() {
    return (
      <View style={styles.basketCont}>
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Ionicons name="md-arrow-round-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.productCountText}>
            My Basket({this.state.products.length} Product)
          </Text>
        </View>
        <BasketProduct
          rerenderParentCallback={this.rerenderParentCallback}
          ProductData={this.state.products}
          setTotalPrice={this.setTotalPrice}
          setProductLastProduct={this.setProductLastProduct}
        />
        <View style={styles.totalPriceCont}>
          <View>
            <Text style={styles.textTotal}>Total</Text>
            <Text style={styles.textPrice}>{this.state.totalPrice} TL</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}
            onPress={() => this.checkoutPressed()}>
            <Text style={styles.textCheckout}>Checkout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItemCont}>
          <MenuItems
            props={this.props}
            pageNo={staticPages["Menu Item"]["My Basket"]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  basketCont: {
    height: windowHeight,
  },
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    width: windowWidth,
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 5,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  backIcon: {
    marginRight: 95,
    marginLeft: 25,
  },
  productCountText: {
    fontSize: 16,
  },
  totalPriceCont: {
    position: "absolute",
    width: windowWidth,
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    bottom: 53,
  },
  checkoutBtn: {
    backgroundColor: "#483d8b",
    width: 200,
    height: 40,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textTotal: {
    fontWeight: "300",
    paddingBottom: 2,
  },
  textPrice: {
    fontWeight: "700",
  },
  textCheckout: {
    fontWeight: "400",
    fontSize: 17,
    color: "#fff",
  },
});
