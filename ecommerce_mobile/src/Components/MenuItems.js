import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import staticPages from "./staticPages.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tracker from "../api/tracker";

const windowWidth = Dimensions.get("window").width;

const MenuItems = ({ props, pageNo }) => {
  console.log(pageNo);
  const [color, setColor] = useState("#483d8b");
  //const onPressMyAccount = () => props.navigation.navigate("Prelogin");
  const onPressMyAccount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      if (token != null) {
        console.log(token);
        props.navigation.navigate("MyAccount");
      } else {
        console.log(token);
        props.navigation.navigate("Prelogin");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onPressHome = () => props.navigation.navigate("Home");
  const onPressBasket = async () => {
    try {
      const value = await AsyncStorage.getItem("basketId");
      console.log(value);
      var response;
      if (value !== null) {
        response = await tracker.get("/basket/" + value);
        if (response.status === 200) {
          props.navigation.push("Basket", {
            products: response.data.productList.productArray,
            totalPrice: response.data.productList.totalprice,
          });
        } else {
          console.log(response.data.message);
        }
      } else {
        props.navigation.navigate("Basket", {
          products: [],
          totalPrice: 0,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onPressCategory = () => props.navigation.navigate("Category");
  return (
    <View style={styles.flatmenuItem}>
      <View style={styles.menuItemIcon}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={
            pageNo != staticPages["Menu Item"]["Home Page"]
              ? onPressHome
              : console.log("Home")
          }
        >
          <Entypo
            name="home"
            size={24}
            color={
              pageNo != staticPages["Menu Item"]["Home Page"] ? "black" : color
            }
          />
          <Text
            style={[
              styles.menuItemText,
              {
                color:
                  pageNo != staticPages["Menu Item"]["Home Page"]
                    ? "black"
                    : color,
              },
            ]}
          >
            Home Page
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={onPressCategory}>
          <MaterialCommunityIcons
            name="shopping-search"
            size={24}
            color={
              pageNo != staticPages["Menu Item"]["Categories"] ? "black" : color
            }
          />
          <Text
            style={[
              styles.menuItemText,
              {
                color:
                  pageNo != staticPages["Menu Item"]["Categories"]
                    ? "black"
                    : color,
              },
            ]}
          >
            Categories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="favorite-border" size={24} color="black" />
          <Text style={styles.menuItemText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={
            pageNo !== staticPages["Menu Item"]["My Basket"]
              ? onPressBasket
              : console.log("My Basket")
          }
        >
          <SimpleLineIcons
            name="handbag"
            size={24}
            color={
              pageNo != staticPages["Menu Item"]["My Basket"] ? "black" : color
            }
          />
          <Text
            style={[
              styles.menuItemText,
              {
                color:
                  pageNo != staticPages["Menu Item"]["My Basket"]
                    ? "black"
                    : color,
              },
            ]}
          >
            My Basket
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={
            pageNo !== staticPages["Menu Item"]["My Account"]
              ? onPressMyAccount
              : console.log("My Account")
          }
        >
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color={
              pageNo != staticPages["Menu Item"]["My Account"] ? "black" : color
            }
          />
          <Text
            style={[
              styles.menuItemText,
              {
                color:
                  pageNo != staticPages["Menu Item"]["My Account"]
                    ? "black"
                    : color,
              },
            ]}
          >
            My Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatmenuItem: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    width: windowWidth,
    paddingTop: 7,
    paddingBottom: 7,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  menuItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  menuItemIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    fontSize: 11,
  },
});

export default MenuItems;
