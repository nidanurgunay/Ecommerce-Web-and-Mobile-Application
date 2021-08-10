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

const keys = ["token", "passcode", "name", "surname", "gender", "address"];

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      gender: "",
      maleButtonBorderColor: "#55555511",
      femaleButtonBorderColor: "#55555511",
      maleButtonBgColor: "#55555511",
      femaleButtonBgColor: "#55555511",
      maleTextColor: "#aaa",
      femaleTextColor: "#aaa",
      femalePressed: false,
      malePressed: false,
      errorMessage: "",
    };
  }

  changeFemalecolor() {
    if (!this.state.femalePressed) {
      this.setState({
        femalePressed: true,
        femaleButtonBorderColor: "#483d8b",
        femaleButtonBgColor: "#fff",
        femaleTextColor: "#483d8b",
        gender: "Female",
        malePressed: false,
        maleButtonBorderColor: "#55555511",
        maleButtonBgColor: "#55555511",
        maleTextColor: "#aaa",
      });
    }
  }

  changeMalecolor() {
    if (!this.state.malePressed) {
      this.setState({
        femalePressed: false,
        femaleButtonBorderColor: "#55555511",
        femaleButtonBgColor: "#55555511",
        femaleTextColor: "#aaa",
        gender: "Male",
        malePressed: true,
        maleButtonBorderColor: "#483d8b",
        maleButtonBgColor: "#fff",
        maleTextColor: "#483d8b",
      });
    }
  }

  postRegister = async (email, password, gender) => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      this.setState({ errorMessage: "Email is Not Correct!!!" });
    } else {
      this.setState({ email: email });
      console.log("Email is Correct");

      try {
        console.log(email + " " + password + " " + gender);
        console.log(typeof password);
        const response = await tracker.post("/register", {
          email: email,
          password: password,
          gender: gender,
        });
        try {
          console.log(response.data.passcode);
          const basketId = await AsyncStorage.getItem("basketId");
          await AsyncStorage.multiRemove(keys);
          await AsyncStorage.setItem(
            "passcode",
            response.data.passcode.toString()
          );
          await AsyncStorage.setItem("token", response.data.token);
          await AsyncStorage.setItem("gender", gender);
          if (basketId !== null)
            await AsyncStorage.setItem("basketId", basketId);
        } catch (e) {
          console.log(e);
        }
        if (
          response.data.message != "Email has been send" ||
          response.data.message == null
        ) {
          //response.status != 200 olması lazım
          //print response message
          if (response.data.message == null) {
            this.setState({ errorMessage: "Something went wrong" });
          } else {
            this.setState({ errorMessage: response.data.message });
          }
        } else {
          this.props.navigation.navigate("EmailConfig", {
            email: email,
            password: password,
            gender: gender,
          });
        }
      } catch (e) {
        console.log("Register// error log: ", e.message);
        this.setState({ errorMessage: e.message });
      }
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
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={"E-mail"}
              style={styles.input}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={"Password"}
              style={styles.input}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
            <Text style={styles.genderText}>Gender</Text>
            <View style={styles.genderView}>
              <TouchableOpacity
                style={{
                  borderColor: this.state.femaleButtonBorderColor,
                  backgroundColor: this.state.femaleButtonBgColor,
                  width: 150,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                }}
                onPress={() => this.changeFemalecolor()}
              >
                <Text style={{ color: this.state.femaleTextColor }}>
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: this.state.maleButtonBorderColor,
                  backgroundColor: this.state.maleButtonBgColor,
                  width: 150,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                }}
                onPress={() => this.changeMalecolor()}
              >
                <Text style={{ color: this.state.maleTextColor }}>Male</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                this.postRegister(
                  this.state.email,
                  this.state.password,
                  this.state.gender
                )
              }
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.termConditions}>
              You will accept Terms and Conditions by clicking Register
            </Text>
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
    //backgroundColor: "#db545a",
    backgroundColor: "#483d8b",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: windowWidth - 40,
    height: windowHeight / 2 + 5,
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
  registerButton: {
    //backgroundColor: "#db545a",
    backgroundColor: "#483d8b",
    width: windowWidth - 80,
    height: 40,
    marginTop: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
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
    //color: "#db545a",
    color: "#483d8b",
  },
  genderText: {
    position: "absolute",
    top: 140,
    left: 25,
    color: "#aaa",
  },

  genderView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 35,
    width: windowWidth - 80,
    justifyContent: "space-evenly",
  },
  genderButton: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
