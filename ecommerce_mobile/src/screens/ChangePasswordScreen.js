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
import MenuItems from "../Components/MenuItems";
import staticPages from "../Components/staticPages.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
      errorMessage: "",
    };
  }

  postChangePassword = async (
    token,
    newpassword,
    oldpassword,
    confirmpassword
  ) => {
    token = await AsyncStorage.getItem("token");
    const oldp = await AsyncStorage.getItem("password");
    const email = await AsyncStorage.getItem("email");
    console.log("ChangePassword/ postchange //");
    if (oldpassword != oldp) {
      this.setState({
        errorMessage: "Old Password did not match your current password!!",
      });
    } else if (confirmpassword != newpassword) {
      this.setState({
        errorMessage: "Passwords are not same!!",
      });
    } else if (oldpassword == newpassword) {
      this.setState({
        errorMessage: "New password must be different!!",
      });
    } else {
      try {
        console.log(
          "ChangePassword// token, newpassword",
          token,
          " ",
          newpassword
        );
        console.log("ChangePassword// typeofnewpassword", typeof newpassword);
        var emailf = await AsyncStorage.getItem("email");
        console.log(emailf);
        const response = await tracker.post("/changePassword", {
          token: token,
          newpassword: newpassword,
          oldpassword: oldpassword,
          email: emailf,
        });
        console.log("response status", response.status);
        console.log("response message", response.data.message);
        console.log("response data", response.data);
        if (response.data.status != "passwordChanged") {
          //response.status != 200 olması lazım
          this.setState({
            errorMessage: response.data.status + ": " + response.data.error,
          });
        } else {
          console.log("ChangePassword// password changed");
          await AsyncStorage.setItem("password", newpassword);
          this.props.navigation.navigate("MyAccount");
        }
      } catch (e) {
        console.log(e.message);
        this.setState({ errorMessage: response.status + ": " + e.message });
      }
    }
  };

  render() {
    return (
      <View style={styles.safeAreaStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.textBarStyle}>Change Password</Text>
        </View>
        <View style={styles.loginContainer}>
          {this.state.errorMessage ? (
            <Text style={styles.errorText}> {this.state.errorMessage} </Text>
          ) : null}
          <TextInput
            placeholder={"Current Password"}
            style={styles.oldPassStyle}
            onChangeText={(oldpassword) => this.setState({ oldpassword })}
            value={this.state.oldpassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={"New Password"}
            style={styles.input}
            onChangeText={(newpassword) => this.setState({ newpassword })}
            value={this.state.newpassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={"New Password Again"}
            style={styles.input}
            onChangeText={(confirmpassword) =>
              this.setState({ confirmpassword })
            }
            value={this.state.confirmpassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() =>
              this.postChangePassword(
                this.state.token,
                this.state.newpassword,
                this.state.oldpassword,
                this.state.confirmpassword
              )
            }
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
        <MenuItems
          props={this.props}
          pageNo={staticPages["Menu Item"]["My Account"]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    paddingTop: 35,
    paddingLeft: 25,
    color: "red",
    fontSize: 15,
    fontWeight: "300",
  },
  loginContainer: {
    width: windowWidth - 40,
    height: windowHeight / 2 + 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    marginTop: 75,
  },
  textBarStyle: {
    color: "white",
    fontSize: 20,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  safeAreaStyle: {
    backgroundColor: "#f1f1f1",
    height: windowHeight,
  },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#483d8b",
    height: 85,
  },
  oldPassStyle: {
    width: windowWidth - 80,
    borderWidth: 1,
    borderColor: "green",
    //borderColor: "#e6e6e6",
    backgroundColor: "#faf9f9",
    height: 50,
    paddingLeft: 10,
    fontWeight: "600",
    borderRadius: 5,
    zIndex: 999,
    marginTop: 35,
    marginLeft: 40,
  },
  input: {
    width: windowWidth - 80,
    borderWidth: 1,
    //borderColor: "#e6e6e6",
    borderColor: "yellow",
    backgroundColor: "#faf9f9",
    height: 50,
    paddingLeft: 10,
    fontWeight: "600",
    borderRadius: 5,
    zIndex: 999,
    marginTop: 25,
    marginLeft: 40,
  },
  updateButtonText: {
    color: "#fff",
  },
  updateButton: {
    backgroundColor: "#483d8b",
    width: windowWidth - 85,
    height: 40,
    marginTop: 25,
    marginLeft: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
