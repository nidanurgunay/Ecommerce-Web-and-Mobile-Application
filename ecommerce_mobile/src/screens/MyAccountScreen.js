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
import { FlatList } from "react-native-gesture-handler";
import tracker from "../api/tracker";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";

import MenuItems from "../Components/MenuItems";
import staticPages from "../Components/staticPages.json";
import Logout from "./LogoutScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const staticItems = [
  {
    name: "Account Information",
    icon: <Feather name="settings" size={24} color="black" />,
    onpress: "AccountInfo",
  },
  {
    name: "Change Password",
    icon: <MaterialCommunityIcons name="key-change" size={24} color="black" />,
    onpress: "ChangePassword",
  },
  {
    name: "Orders",
    icon: <Entypo name="shopping-basket" size={24} color="black" />,
    onpress: "Orders",
  },
  {
    name: "Log Out",
    icon: <MaterialCommunityIcons name="logout" size={24} color="black" />,
    onpress: "Logout",
  },
];
export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      errorMessage: "",
      email: "",
      gender: "",
    };
    this.init();
  }

  init = async () => {
    const tokenf = await AsyncStorage.getItem("token");
    const emailf = await AsyncStorage.getItem("email");
    const genderf = await AsyncStorage.getItem("gender");
    this.setState({
      token: tokenf,
      email: emailf,
      gender: genderf,
    });
  };

  goOrders = async (item) => {
    try {
      const userid = await AsyncStorage.getItem("userid");
      if (userid !== null || userid !== undefined) {
        const response = await tracker.get("/order/user/" + userid);
        if (response.status === 200) {
          if (response.data !== null || response.data !== []) {
            const orders = response.data;
            var address = [];
            orders.map(async (a) => {
              try {
                var response = await tracker.get("/adress/" + a.address);
                if (response.status === 200) {
                  console.log(response.data.adress);
                  address.push(response.data.adress);
                } else {
                  console.log(
                    "Address could not retrieved",
                    response.data.message
                  );
                }
              } catch (e) {
                console.log(e);
              }
            });
            setTimeout(() => {
              this.props.navigation.push(item.onpress, {
                address: address,
                orders: orders,
              });
            }, 1300);
          } else {
            console.log("There is not any order");
          }
        } else {
          console.log("Could not get orders");
        }
      }
    } catch (e) {
      console.log("Go Orders: ", e);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.textBarStyle}>{this.state.email}</Text>
        </View>
        <View style={styles.listStyle}>
          <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(staticItems) => staticItems.name}
            data={staticItems}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  horizontal={true}
                  onPress={
                    item.name !== "Orders"
                      ? () => this.props.navigation.navigate(item.onpress)
                      : () => this.goOrders(item)
                  }
                >
                  <Text style={styles.buttonTextStyle}>
                    {item.icon} {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <MenuItems
          props={this.props}
          pageNo={staticPages["Menu Item"]["My Account"]}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    fontWeight: "300",
  },
  safeAreaStyle: {
    paddingTop: 10,
    backgroundColor: "#483d8b",
    height: windowHeight,
  },
  textBarStyle: {
    color: "white",
    paddingTop: 25,
    paddingBottom: 60,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  listStyle: {
    paddingBottom: 25,
    backgroundColor: "#faf9f9",
    height: windowHeight,
  },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 20,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  buttonStyle: {
    borderStartWidth: 1,
    borderWidth: 1.5,
    borderRadius: 1,
    borderEndWidth: 10,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#faf9f9",

    height: 60,
  },
  buttonTextStyle: {
    fontSize: 15,
    marginTop: 15,
    marginLeft: 10,
    fontWeight: "500",
    marginHorizontal: 50,
  },
});
