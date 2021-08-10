import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  FlatList,
  Image,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import tracker from "../api/tracker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class OrderProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.navigation.state.params.products,
      totalPrice: props.navigation.state.params.totalPrice,
    };
  }
  render() {
    return (
      <View style={styles.safeAreaStyle}>
        <View style={styles.headerStyle}>
          <View style={styles.headerStyle2}>
            <Entypo name="shopping-basket" size={24} color="black" />
          </View>
          <View style={styles.headerStyle3}>
            <Text style={styles.textBarStyle}>Orders</Text>
          </View>
        </View>
        <FlatList
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item._id.toString()}
          data={this.state.products}
          style={styles.flatList}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.ProductContainer}>
                <Image
                  source={{uri: item.image[0]}}
                  style={styles.ProductImage}
                />
                <View style={styles.description}>
                  <Text style={{ fontWeight: "500" }}>{item.name}</Text>
                  <Text style={{ fontWeight: "300" }}>Size: {item.size}</Text>
                  <View style={styles.countView}>
                    <Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#483d8b",
                        }}
                      >
                        Quantity:{" "}
                      </Text>
                      {item.quantity}
                    </Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceTextStyle}>{item.price} TL</Text>
                </View>
              </View>
            );
          }}
        />
        <View style={styles.addComment}>
          <View
            style={styles.addCommentBtn}
            onPress={() => this.goPostCommentScreen()}
          >
            <Text style={styles.textEvaluate}>Total {this.state.totalPrice} TL</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    backgroundColor: "#f1f1f1",
    height: windowHeight,
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "#483d8b",
    paddingRight: 12,
  },
  headerStyle2: {
    marginTop: 25,
    marginRight: 8,
  },
  headerStyle3: {
    marginTop: 15,
  },
  textBarStyle: {
    color: "white",
    paddingTop: 35,
    paddingBottom: 50,
    fontSize: 20,
  },
  ProductImage: {
    height: 80,
    width: 60,
  },
  ProductContainer: {
    height: 130,
    width: windowWidth,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  description: {
    display: "flex",
    justifyContent: "space-evenly",
    height: 100,
  },
  priceContainer: {
    height: 80,
    display: "flex",
    justifyContent: "flex-end",
  },
  priceTextStyle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#483d8b",
  },
  countView: {
    marginRight: 20,
    height: 20,
    width: 77,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  addComment: {
    width: windowWidth,
    height: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 20,
    zIndex: 99,
    bottom: 0,
  },
  addCommentBtn: {
    backgroundColor: "#fff",
    width: 200,
    height: 40,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#483d8b",
    alignItems: "center",
    justifyContent: "center",
  },
  textEvaluate: {
    fontWeight: "400",
    fontSize: 17,
    color: "#483d8b",
  },
});
