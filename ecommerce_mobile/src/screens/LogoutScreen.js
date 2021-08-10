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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const keys = ["token", "email", "password", "passcode", "addressId", "userid", "address"];

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.logoutFunc = async () => {
      try {
        const basketId = await AsyncStorage.getItem("basketId");
        await AsyncStorage.multiRemove(keys);
        if (basketId !== null) await AsyncStorage.setItem("basketId", basketId);
        console.log("Logout// Successfully removed items");
        const token = await AsyncStorage.getItem("token");
        console.log("Logout// token: ", token);
      } catch (e) {
        console.log(e);
      }
    };
    setTimeout(() => {
      this.logoutFunc();
      props.navigation.navigate("Prelogin");
    }, 2000);
  }
  render() {
    const staticItems = [];
    return (
      <SafeAreaView style={styles.containerStyle}>
        <Image source={require("../images/default-logo.png")} />
        <Text style={styles.text}>Logging out...</Text>
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
  },
});
