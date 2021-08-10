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
} from "react-native";
import tracker from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };
  }
  postLogin = async (email, password) => {
    try {
      console.log(email + " " + password);
      console.log(typeof password);
      const response = await tracker.post("/login", {
        email: email,
        password: password,
      });
      console.log("response status", response.status);
      console.log("response message", response.data.message);
      console.log("response data", response.data);
      if (response.data.status != "ok") {
        //response.status != 200 olması lazım
        //print response message
        this.setState({
          errorMessage: response.data.status + ": " + response.data.error,
        });
      } else {
        try {
          await AsyncStorage.setItem("token", response.data.token);
          await AsyncStorage.setItem("userid", response.data.userid);
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
          console.log("Login// ");
          this.props.navigation.navigate("Home");
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log("error log: ", e.message);
      this.setState({ errorMessage: response.status + ": " + e.message });
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
              placeholder={"Email"}
              style={styles.input}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              placeholder={"Password"}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
            <TouchableOpacity style={styles.forgetPassword}>
              <Text style={styles.forgetPasswordText}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() =>
                this.postLogin(this.state.email, this.state.password)
              }
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.otherLogin}>Other Login Options</Text>
            <View style={styles.otherLoginIcon}>
              <TouchableOpacity style={styles.otherLoginButton}>
                <Image source={require("../images/facebooklogo.png")} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.otherLoginButton}>
                <Image source={require("../images/googlelogo.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.register}>
              <Text style={styles.questionStyle}>Not a member?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <Text style={styles.registerText}>Register</Text>
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
    backgroundColor: "#faf9f9" ,
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
  forgetPassword: {
    position: "absolute",
    right: 27,
    top: 140,
  },
  forgetPasswordText: {
    //color: "#db545a",
    color: "#483d8b",
  },
  loginButton: {
    //backgroundColor: "#db545a",
    backgroundColor: "#483d8b",
    width: windowWidth - 80,
    height: 40,
    marginTop: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
  },
  otherLogin: {
    color: "#a6a6a6",
  },
  otherLoginIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
  },
  register: {
    display: "flex",
    flexDirection: "row",
    width: 143,
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 12,
  },
  questionStyle: {
    fontSize: 13,
  },
  registerText: {
    fontSize: 13,
    //color: "#db545a",
    color: "#483d8b",
  },
});
