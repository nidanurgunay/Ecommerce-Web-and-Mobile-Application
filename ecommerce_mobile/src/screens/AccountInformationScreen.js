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
import MenuItems from "../Components/MenuItems";
import staticPages from "../Components/staticPages.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      email: "",
      password: "",
      gender: "",
      name: "",
      surname: "",
      address: "",
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
    this.init();
  }

  init = async () => {
    const tokenf = await AsyncStorage.getItem("token");
    const emailf = await AsyncStorage.getItem("email");
    const genderf = await AsyncStorage.getItem("gender");
    console.log(genderf);
    const namef = await AsyncStorage.getItem("name");
    const surnamef = await AsyncStorage.getItem("surname");
    const passwordf = await AsyncStorage.getItem("password");
    const addressf = await AsyncStorage.getItem("address");
    this.setState({
      token: tokenf,
      email: emailf,
      gender: genderf,
      name: namef,
      surname: surnamef,
      password: passwordf,
      address: addressf,
    });
    if (this.state.gender == "Male") {
      this.changeMalecolor();
    } else {
      this.changeFemalecolor();
    }
  };

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

  updateInfo = async (namef, surnamef, genderf, address) => {
    try {
      console.log("UserInfo/updateInfo// address: ", address);
      await AsyncStorage.setItem("name", namef);
      await AsyncStorage.setItem("surname", surnamef);
      await AsyncStorage.setItem("gender", genderf);
      await AsyncStorage.setItem("address", address);
      const userID = await AsyncStorage.getItem("userid");
      const adID = await AsyncStorage.getItem("addressId");
      if (address != "") {
        if (adID != null) {
          const response = await tracker.put("adress/" + adID, {
            newadress: address,
            Id: adID,
          });
          if (response.status != 200) {
            console.log(response.status + ": " + response.data.message);
          } else {
            console.log("UserInfo/updateInfo//put/ Adress updated");
            console.log("Adress id: ", response.data._id);
            await AsyncStorage.setItem("addressId", response.data._id);
          }
        } else {
          const response = await tracker.post("/adress", {
            adress: address,
            user: userID,
          });
          if (response.status != 200) {
            console.log(response.status + ": " + response.data.message);
          } else {
            console.log("UserInfo/updateInfo//post/ Adress updated");
            console.log("Adress id: ", response.data._id);
            await AsyncStorage.setItem("addressId", response.data._id);
          }
        }
      }
      console.log("UserInfo/updateInfo// all fine");
      this.props.navigation.navigate("MyAccount");
    } catch (e) {
      console.log("UserInfo/updateInfo// e: ", e);
    }
  };
  render() {
    return (
      <View style={styles.safeAreaStyle}>
        <View style={styles.headerStyle}>
          <View style={styles.headerStyle2}>
            <Feather name="settings" size={24} color="black" />
          </View>
          <View style={styles.headerStyle3}>
            <Text style={styles.textBarStyle}>Account Information</Text>
          </View>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Name</Text>
          <TextInput
            autoCorrect={false}
            placeholder={"Name"}
            style={{
              paddingLeft: 40,
              marginTop: 15,
              marginBottom: 15,
              marginLeft: 25,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          ></TextInput>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Surname</Text>
          <TextInput
            autoCorrect={false}
            placeholder={"Surname"}
            style={{
              paddingLeft: 20,
              marginTop: 15,
              marginBottom: 15,
              marginLeft: 25,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onChangeText={(surname) => this.setState({ surname })}
            value={this.state.surname}
          ></TextInput>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.genderText}>Gender</Text>
          <View style={styles.genderView}>
            <TouchableOpacity
              style={{
                borderColor: this.state.femaleButtonBorderColor,
                backgroundColor: this.state.femaleButtonBgColor,
                width: 120,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
              onPress={() => this.changeFemalecolor()}
            >
              <Text style={{ color: this.state.femaleTextColor }}>
                {" "}
                Female{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: this.state.maleButtonBorderColor,
                backgroundColor: this.state.maleButtonBgColor,
                width: 120,
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
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Address</Text>
          <TextInput
            autoCorrect={false}
            placeholder={"Address"}
            multiline={true}
            dense={true}
            style={{
              width: "70%",
              paddingLeft: 20,
              marginTop: 15,
              marginBottom: 15,
              marginLeft: 25,
              alignContent: "center",
              //alignItems: "center",
              justifyContent: "center",
              alignItems: this.multiline ? "flex-start" : "center",
            }}
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}
          ></TextInput>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>E-mail</Text>
          <Text style={styles.textInput}> {this.state.email} </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Password(forDemo)</Text>
          <Text style={styles.temporary}> {this.state.password} </Text>
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() =>
            this.updateInfo(
              this.state.name,
              this.state.surname,
              this.state.gender,
              this.state.address
            )
          }
        >
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
        <MenuItems
          props={this.props}
          pageNo={staticPages["Menu Item"]["My Account"]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 40,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  textBarStyle: {
    color: "white",
    paddingTop: 35,
    paddingBottom: 50,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  safeAreaStyle: {
    //backgroundColor: "#db545a",
    //backgroundColor: "gray",
    backgroundColor: "#f1f1f1",
    height: windowHeight,
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    backgroundColor: "#483d8b",
    paddingLeft: 8,
  },
  headerStyle2: {
    marginTop: 25,
    marginRight: 8,
  },
  headerStyle3: {
    marginTop: 15,
  },
  buttonTextStyle: {
    borderStartWidth: 1,
    borderWidth: 1.5,
    borderRadius: 1,
    borderEndWidth: 10,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#faf9f9",
    height: 50,
    paddingTop: 15,
    paddingLeft: 5,
    fontSize: 15,
  },
  viewStyle: {
    backgroundColor: "#faf9f9",
    flexDirection: "row",
    borderStartWidth: 1,
    borderWidth: 1.5,
    borderRadius: 1,
    borderEndWidth: 10,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
  },
  textStyle: {
    paddingLeft: 10,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "bold",
  },
  textInput: {
    paddingLeft: 30,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  temporary: {
    paddingLeft: 30,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 0,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  updateButton: {
    //backgroundColor: "#db545a",
    backgroundColor: "#483d8b",
    width: windowWidth - 80,
    height: 40,
    marginTop: 15,
    marginLeft: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: "#fff",
  },
  genderText: {
    paddingLeft: 10,
    marginTop: 25,
    marginBottom: 15,
    fontWeight: "bold",
  },
  genderView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    width: windowWidth - 80,
    justifyContent: "center",
  },
  genderButton: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
