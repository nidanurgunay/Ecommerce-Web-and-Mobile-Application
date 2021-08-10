import { Component } from "react/cjs/react.production.min";
import React, { useState } from "react";
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
} from "react-native";

import tracker from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class EmailConfig extends Component {
  constructor(props) {
    super(props);
    console.log("EmailConfig// props", props);
    console.log("EmailConfig// email", props.navigation.state.params.email);
    this.state = {
      token: "",
      passcode: "",
      errorMessage: "",
    };
  }

  activateEmail = async (passcode) => {
    try {
      var localpasscode;
      var localtoken;
      try {
        localpasscode = await AsyncStorage.getItem("passcode");
        localtoken = await AsyncStorage.getItem("token");
        console.log(localpasscode);
        console.log(passcode);
      } catch (e) {
        console.log(e);
      }
      if (passcode === localpasscode) {
        const response = await tracker.post("/activateEmail", {
          token: localtoken,
          passcode: passcode,
        });

        console.log("response status", response.status);
        console.log("response message", response.data.message);
        console.log("response data", response.data);
        if (response.status != 200) {
          //response.status != 200 olması lazım
          //print response message
          if (response.data.message == null) {
            this.setState({ errorMessage: "Something went wrong" });
          } else {
            this.setState({ errorMessage: response.data.message });
          }
        } else {
          try {
            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("userid", response.data.id);
            await AsyncStorage.setItem(
              "email",
              this.props.navigation.state.params.email
            );
            await AsyncStorage.setItem(
              "password",
              this.props.navigation.state.params.password
            );
            await AsyncStorage.setItem(
              "gender",
              this.props.navigation.state.params.gender
            );
            /**********************************/
            // for checking,  CAN BE DELETED
            const token = await AsyncStorage.getItem("token");
            const em = await AsyncStorage.getItem("email");
            const pass = await AsyncStorage.getItem("password");
            const gen = await AsyncStorage.getItem("gender");
            console.log("EmailConfig// token: ", token);
            console.log("EmailConfig// email: ", em);
            console.log("EmailConfig// password: ", pass);
            console.log("EmailConfig// gender: ", gen);
            // for checking,  CAN BE DELETED
            /**********************************/
            this.props.navigation.navigate("Home");
          } catch (e) {
            console.log(e);
          }
        }
      }
    } catch (e) {
      console.log("Error :", e.message);
      this.setState({ errorMessage: e.message });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.containerStyle}>
        <View style={styles.flex2container}>
          <View style={styles.logo}>
            <Image source={require("../images/default-logo.png")} />
          </View>
        </View>
        <View style={styles.flex3container}>
          <View style={styles.loginContainer}>
            {this.state.errorMessage ? (
              <Text style={styles.errorText}> {this.state.errorMessage} </Text>
            ) : null}
            <TextInput
              placeholder={"Please type recieved token from e-mail"}
              style={styles.input}
              onChangeText={(passcode) => this.setState({ passcode })}
              value={this.state.passcode}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.activateEmail(this.state.passcode)}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <View style={styles.register}>
              <Text style={styles.questionStyle}>Already have account?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={styles.backLoginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  containerStyle: {
    flex: 1,
    backgroundColor: "#483d8b",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: windowWidth - 40,
    height: windowHeight / 3 + 5,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    top: Platform.OS === "ios" ? -107 : 0,
    marginTop: Platform.OS === "android" ? 20 : 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  logo: {
    position: "absolute",
    top: 100,
  },
  flex2container: {
    flex: Platform.OS === "ios" ? 2.5 : 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  flex3container: {
    flex: 3,
    width: windowWidth,
    backgroundColor: Platform.OS === "ios" ? "#faf9f9" : "#db545a",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: windowWidth - 80,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#faf9f9",
    height: 50,
    paddingLeft: 10,
    fontWeight: "600",
    borderRadius: 5,
    zIndex: 999,
  },
  confirmButton: {
    backgroundColor: "#483d8b",
    width: windowWidth - 80,
    height: 40,
    marginTop: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "#fff",
  },
  register: {
    display: "flex",
    flexDirection: "row",
    width: 143,
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 12,
  },
  termConditions: {
    fontSize: 11,
    fontWeight: "300",
  },
  questionStyle: {
    fontSize: 13,
  },
  backLoginText: {
    fontSize: 13,
    color: "#db545a",
  },
});
