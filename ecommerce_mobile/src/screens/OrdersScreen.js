import React, { Component } from "react";
import { StyleSheet, Text, Dimensions, View, FlatList } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import tracker from "../api/tracker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

var dates = [];
var address = [];
var x = [];
export default class Orders extends Component {
  constructor(props) {
    super(props);
    console.log(props.navigation.state.params.orders);
    x = props.navigation.state.params.orders;
    dates = [];
    x.map((a) => {
      var date = new Date(a.createdAt);
      var formatted = date.toDateString();
      dates.push(formatted);
    });
    console.log(props.navigation.state.params.address);
    this.state = {
      orders: props.navigation.state.params.orders,
      address: props.navigation.state.params.address,
      dates: dates,
    };
  }

  goOrderProducts = async (basketId) => {
    try {
      const response = await tracker.get("/basket/" + basketId);
      if (response.status === 200) {
        var totalPrice;
        var products;
        if (
          response.data !== null &&
          response.data !== undefined &&
          response.data !== ""
        ) {
          totalPrice = response.data.productList.totalprice ?? 0;
          products = response.data.productList.productArray ?? [];
        } else {
          totalPrice = 0;
          products = [];
        }
        this.props.navigation.push("OrderProducts", {
          totalPrice: totalPrice,
          products: products,
        });
      } else {
        console.log("Request Failed: ", response.data.message);
      }
    } catch (e) {
      console.log("Order Products: ", e);
    }
  };
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
          data={this.state.orders}
          style={styles.flatList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.commentCont}
                onPress={() => this.goOrderProducts(item.basket)}
              >
                <View style={styles.commentInfo}>
                  <View style={styles.orderStatus}>
                    <Text
                      style={{
                        color: "#00cc00",
                        fontWeight: "500",
                        marginRight: 5,
                      }}
                    >
                      {item.status}
                    </Text>
                    <AntDesign name="checkcircle" size={16} color="#00cc00" />
                  </View>
                  <Text style={{ color: "#483d8b", fontWeight: "500" }}>
                    {this.state.dates[index]}
                  </Text>
                </View>
                <Text numberOfLines={3}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#483d8b",
                    }}
                  >
                    {" "}
                    Delivery Address:{" "}
                  </Text>{" "}
                  {this.state.address[index]}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
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
  commentCont: {
    height: 120,
    width: windowWidth,
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentInfo: {
    display: "flex",
    flexDirection: "row",
    width: windowWidth - 30,
    justifyContent: "space-between",
    marginBottom: 35,
  },
  orderStatus: {
    display: "flex",
    flexDirection: "row",
  },
});
