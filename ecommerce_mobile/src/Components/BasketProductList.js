import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet, Image } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SwipeListView } from "react-native-swipe-list-view";
import tracker from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const BasketProduct = ({
  ProductData,
  rerenderParentCallback,
  setTotalPrice,
  setProductLastProduct,
}) => {
  const [products, setProducts] = useState(ProductData);
  const [selectedCount, setselectedCount] = useState("1");
  const [dummyProduct, setdummyProduct] = useState(ProductData);

  const increaseProductCount = async (id) => {
    var items = products;
    var item = items.find((a) => a.product === id);
    var newCount = item.quantity + 1;
    item.quantity = newCount;
    items.map((a) => {
      if (a.product === id) a = item;
    });
    try {
      var basketId = await AsyncStorage.getItem("basketId");
      var response = await tracker.put("/basket/byOne/" + basketId, {
        product: id,
      });
      console.log(response);
      if (response.status === 200) {
        setProducts(response.data.productList.productArray);
        setProductLastProduct(response.data.productList.productArray);
        setTotalPrice(response.data.productList.totalprice);
        rerenderParentCallback();
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
    setdummyProduct(items);
  };

  const decreaseProductCount = async (id) => {
    var items = products;
    var item = items.find((a) => a.product === id);
    var newCount = item.quantity - 1;
    console.log(item);
    if (item.quantity != 1) {
      item.quantity = newCount;
      items.map((a) => {
        if (a.product === id) a = item;
      });
      try {
        var basketId = await AsyncStorage.getItem("basketId");
        var response = await tracker.put("/basket/delete/byOne/" + basketId, {
          product: id,
        });
        if (response.status === 200) {
          setProducts(response.data.productList.productArray);
          setProductLastProduct(response.data.productList.productArray);
          setTotalPrice(response.data.productList.totalprice);
          rerenderParentCallback();
        } else {
          console.log(response.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
    rerenderParentCallback();
  };

  const deleteProduct = async (id) => {
    var items = products;
    var item = items.find((a) => a.product === id);
    try {
      var basketId = await AsyncStorage.getItem("basketId");
      var response = await tracker.put("/basket/delete/" + basketId, {
        product: id,
      });
      console.log(response);
      if (response.status === 200) {
        setProducts(response.data.productList.productArray);
        setProductLastProduct(response.data.productList.productArray);
        setTotalPrice(response.data.productList.totalprice);
        rerenderParentCallback();
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
    setdummyProduct(dummyProduct);
  };

  return (
    <SwipeListView
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.product}
      style={styles.swipeList}
      data={products}
      renderItem={({ item }) => {
        return (
          <View style={styles.ProductContainer}>
            <TouchableOpacity>
              <AntDesign name="checkcircle" size={20} color="#483d8b" />
            </TouchableOpacity>
            <Image
              source={{uri: item.image[0]}}
              style={styles.ProductImage}
            />
            <View style={styles.description}>
              <Text style={{ fontWeight: "500" }}>{item.name}</Text>
              <Text style={{ fontWeight: "300" }}>Size: {item.size}</Text>
              <View style={styles.countProducts}>
                <TouchableOpacity
                  onPress={() => decreaseProductCount(item.product)}
                  style={styles.countBtn}
                >
                  <AntDesign name="minuscircleo" size={20} color="#483d8b" />
                </TouchableOpacity>
                <View style={styles.countView}>
                  <Text style={styles.countText}>{item.quantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => increaseProductCount(item.product)}
                  style={styles.countBtn}
                >
                  <AntDesign name="pluscircleo" size={20} color="#483d8b" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceTextStyle}>{item.price} TL</Text>
            </View>
          </View>
        );
      }}
      renderHiddenItem={({ item }) => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteProduct(item.product)}
        >
          <Feather name="trash" size={34} color="white" />
        </TouchableOpacity>
      )}
      disableRightSwipe
      leftOpenValue={150}
      rightOpenValue={-150}
      stopLeftSwipe={150}
      stopRightSwipe={-150}
    />
  );
};

const styles = StyleSheet.create({
  swipeList: {
    marginBottom: 120,
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
  countProducts: {
    display: "flex",
    flexDirection: "row",
  },
  countBtn: {
    marginRight: 10,
  },
  countView: {
    marginRight: 10,
    borderWidth: 1,
    height: 20,
    width: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
  },
  deleteButton: {
    height: 130,
    width: 150,
    backgroundColor: "red",
    marginLeft: windowWidth - 150,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BasketProduct;
