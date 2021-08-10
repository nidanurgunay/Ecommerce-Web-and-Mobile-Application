import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
  Box,
} from "react-native";
import tracker from "../api/tracker";
import { FlatList } from "react-native-gesture-handler";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import MenuItems from "../Components/MenuItems";
import staticPages from "../Components/staticPages.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const keys = ["token", "email", "password"];

export default class AfterCheckout extends Component {
  constructor(props) {
    super(props);
    console.log("Aftercheckout// ");
    this.checkoutFunc = async () => {
      try {
        const value = await AsyncStorage.getItem("basketId");
        if (value) {
          await AsyncStorage.removeItem("basketId");
          console.log("Aftercheckout// Successfully removed basketID");
          this.props.navigation.push("Basket", {
            products: [],
            totalPrice: 0,
          });
        } else {
          console.log("Aftercheckout// noluyoruz(basketID bulunamadı)");
        }
      } catch (e) {
        console.log("Aftercheckout// ", e);
      }
    };
    setTimeout(() => {
      this.checkoutFunc();
    }, 2000);
  }
  render() {
    return (
      <SafeAreaView style={styles.containerStyle}>
        <Ionicons name="md-checkmark-circle-outline" size={90} color="green" />
        <Text style={styles.text}>Thank you for choosing us!!</Text>
        <Image source={require("../images/default-logo.png")} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    //backgroundColor: "#db545a",
    backgroundColor: "#483d8b",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingTop: 35,
    fontSize: 20,
    paddingBottom: 25,
  },
});
