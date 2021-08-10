import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MenuItems from "../Components/MenuItems";
import { TouchableOpacity } from "react-native-gesture-handler";
import staticPages from "../Components/staticPages.json"

const windowWidth = Dimensions.get("window").width;

export default class Prelogin extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      props.navigation.navigate("Login");
    }, 800);
  }
  render() {
    return (
      <SafeAreaView style={styles.containerStyle}>
        <FontAwesome5 name="smile-beam" size={120} color="#483d8b" />
        <Text style={styles.accountStyle}>My Account</Text>
        <Text style={styles.descriptionStyle}>
          Please login to see your account.
          You can follow your orders and basket status from your account.
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.loginTextStyle}>Login</Text>
        </TouchableOpacity>
        <MenuItems props={this.props} pageNo={staticPages["Menu Item"]["My Account"]} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#faf9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  accountStyle: {
    fontWeight: "400",
    marginTop: 15,
    marginBottom: 10,
  },
  descriptionStyle: {
    fontWeight: "300",
    color: "#A9A9A9",
    marginBottom: 25,
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyle: {
    backgroundColor: "#483d8b",
    width: windowWidth - 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  loginTextStyle: {
    color: "#fff",
  },
});
