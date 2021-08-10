import React, { Component } from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      props.navigation.navigate("Home");
    }, 2000);
  }
  render() {
    return (
      <SafeAreaView style={styles.containerStyle}>
        <Image source={require("../images/default-logo.png")} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#483d8b",
    justifyContent: "center",
    alignItems: "center",
  },
});
