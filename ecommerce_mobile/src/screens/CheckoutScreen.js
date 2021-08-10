import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MenuItems from "../Components/MenuItems";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import staticPages from "../Components/staticPages.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-input-credit-card";
import tracker from "../api/tracker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    console.log("constuctor");
    this.state = {
      errorMessageCard: "",
      errorMessageDel: "",
      errorMessageBil: "",
      errorMessageEmail: "",
      token: "",
      deliveryAdd: "",
      billingAdd: "",
      cardNo: "",
      cardExpDate: "",
      cardCVV: "",
      totalPrice: "",
      products: [],
      email: "",
      editPressedEmail: false,
      editPressedDelivery: false,
      editPressedBilling: false,
      validCardInfo: false,
    };
    this.init();
  }

  init = async () => {
    const tokenf = await AsyncStorage.getItem("token");
    const addressf = await AsyncStorage.getItem("address");
    const userEmail = await AsyncStorage.getItem("email");
    if (userEmail !== null && userEmail !== undefined) {
      this.setState({ email: userEmail, editPressedEmail: false });
      if (addressf == null) {
        //if some address does not exist
        this.setState({
          editPressedDelivery: true,
          editPressedBilling: true,
        });
      }
    }
    this.setState({
      token: tokenf,
      deliveryAdd: addressf,
      billingAdd: addressf,
      totalPrice: this.props.navigation.state.params.totalPrice,
      products: this.props.navigation.state.params.products,
    });
  };
  onpressEditDelivery() {
    this.setState({
      editPressedDelivery: this.state.editPressedDelivery ? false : true,
    });
  }
  onpressEditBilling() {
    this.setState({
      editPressedBilling: this.state.editPressedBilling ? false : true,
    });
  }
  onpressEditEmail() {
    this.setState({
      editPressedEmail: this.state.editPressedEmail ? false : true,
    });
  }
  _onChange = (formData) => {
    //console.log(JSON.stringify(formData, null, " "));
    //console.log("valid: ", typeof (formData["valid"]));
    //console.log("values number: ", typeof (formData["values"]["number"]));
    this.setState({
      cardNo: formData["values"]["number"],
      cardExpDate: formData["values"]["expiry"],
      cardCVV: formData["values"]["cvc"],
      validCardInfo: formData["valid"],
    });
  };

  onpressConfirm = async () => {
    // INPUT CHECK & CONNECT INVOICE API
    var check = true;
    if (!this.state.validCardInfo) {
      this.setState({
        errorMessageCard: "Please enter a valid card!!",
      });
      check = false;
    } else {
      this.setState({
        errorMessageCard: "",
      });
    }
    if (this.state.deliveryAdd === null || this.state.deliveryAdd.length < 17) {
      this.setState({
        errorMessageDel:
          "Delivery Address must contain at least 16 characters!!",
      });
      check = false;
    } else {
      this.setState({
        errorMessageDel: "",
      });
    }
    if (this.state.billingAdd === null || this.state.billingAdd.length < 17) {
      this.setState({
        errorMessageBil:
          "Billing Address must contain at least 16 characters!!",
      });
      check = false;
    } else {
      this.setState({
        errorMessageBil: "",
      });
    }
    if (this.state.email !== "") {
      let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      if (reg.test(this.state.email) === false) {
        this.setState({
          errorMessageEmail: "Email is Not Correct",
        });
        check = false;
      } else {
        this.setState({
          errorMessageEmail: "",
        });
      }
    }
    if (check) {
      // ADD """""""""adress and invoice api"""""""""""""""
      this.setState({
        editPressedDelivery: false,
        editPressedBilling: false,
      });

      var email = this.state.email;
      var basketId = await AsyncStorage.getItem("basketId");
      var userID = await AsyncStorage.getItem("userid");
      var adID = await AsyncStorage.getItem("addressId");
      if (adID != null && adID != undefined) {
        try {
          const response = await tracker.put("adress/" + adID, {
            newadress: this.state.billingAdd,
            Id: adID,
          });
          if (response.status != 200) {
            console.log(response.status + ": " + response.data.message);
          } else {
            console.log("UserInfo/updateInfo//put/ Adress updated");
            console.log("Adress id: ", response.data._id);
            await AsyncStorage.setItem("addressId", response.data._id);
          }
        } catch (e) {
          console.log("AfterCheckout confirm// error: ", e);
        }
      } else {
        try {
          const response = await tracker.post("/adress", {
            adress: this.state.billingAdd,
            user: userID,
          });
          if (response.status != 200) {
            console.log(response.data.status + ": " + response.data.error);
          } else {
            console.log("UserInfo/updateInfo//post/ Adress updated");
            console.log("Adress id: ", response.data._id);
            await AsyncStorage.setItem("addressId", response.data._id);
          }
        } catch (e) {
          console.log("AfterCheckout confirm// error2: ", e);
        }
      }
      adID = await AsyncStorage.getItem("addressId");
      try {
        const response = await tracker.post("/order", {
          email: email,
          status: "ordered",
          user: userID,
          basket: basketId,
          address: adID,
          creditCardNo: this.state.cardNo,
          cvv: this.state.cardCVV,
          creditExpirationDate: this.state.cardExpDate,
        });
        if (response.status === 200) {
          this.props.navigation.navigate("AfterCheckout");
        } else {
          console.log(
            "Error Occured While Sending Request",
            response.data.message
          );
        }
      } catch (e) {
        console.log("CatchError :", e);
      }
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.textBarStyle}>Checkout</Text>
        </View>
        <KeyboardAwareScrollView
          style={styles.scrollViewStyle}
          bounces={true}
          behaviour="padding"
          enabled={true}
        >
          {this.state.errorMessageCard ? (
            <Text style={styles.errorText}>
              {" "}
              {this.state.errorMessageCard}{" "}
            </Text>
          ) : null}
          <CreditCardInput
            validColor={"black"}
            invalidColor={"red"}
            allowScroll={true}
            onChange={this._onChange}
          />
          {this.state.errorMessageDel ? (
            <Text style={styles.errorText}> {this.state.errorMessageDel} </Text>
          ) : null}
          <View style={styles.deliveryContainer}>
            <View style={styles.deliveryViewStyle}>
              <Text style={styles.textheaderStyle}>Delivery Address</Text>
              <TouchableOpacity onPress={() => this.onpressEditDelivery()}>
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      this.state.editPressedDelivery === true
                        ? "#483d8b"
                        : "#888",
                  }}
                >
                  {" "}
                  Add / Edit{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: 10,
                height: 80,
                width: windowWidth - 40,
                justifyContent: "center",
                paddingTop: 15,
              }}
            >
              <TextInput
                style={[
                  styles.addressInput,
                  {
                    backgroundColor: this.state.editPressedDelivery
                      ? "#fff"
                      : "#eee",
                    color: this.state.editPressedDelivery ? "#000" : "#777",
                    alignItems: this.multiline ? "flex-start" : "center",
                    height: 65,
                  },
                ]}
                multiline={true}
                dense={true}
                placeholder={"Address"}
                placeholderTextColor={"#999"}
                editable={this.state.editPressedDelivery}
                selectTextOnFocus={this.state.editPressedDelivery}
                autoCorrect={false}
                onChangeText={(deliveryAdd) => this.setState({ deliveryAdd })}
                value={this.state.deliveryAdd}
              ></TextInput>
            </View>
          </View>
          {this.state.errorMessageBil ? (
            <Text style={styles.errorText}> {this.state.errorMessageBil} </Text>
          ) : null}
          <View style={styles.deliveryContainer}>
            <View style={styles.deliveryViewStyle}>
              <Text style={styles.textheaderStyle}>Billing Address</Text>
              <TouchableOpacity onPress={() => this.onpressEditBilling()}>
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      this.state.editPressedBilling === true
                        ? "#483d8b"
                        : "#888",
                  }}
                >
                  {" "}
                  Add / Edit{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: 10,
                height: 80,
                width: windowWidth - 40,
                justifyContent: "center",
                paddingTop: 15,
              }}
            >
              <TextInput
                style={[
                  styles.addressInput,
                  {
                    backgroundColor: this.state.editPressedBilling
                      ? "#fff"
                      : "#eee",
                    color: this.state.editPressedBilling ? "#000" : "#777",
                    alignItems: this.multiline ? "flex-start" : "center",
                    height: 65,
                  },
                ]}
                multiline={true}
                dense={true}
                placeholder={"Address"}
                placeholderTextColor={"#999"}
                editable={this.state.editPressedBilling}
                selectTextOnFocus={this.state.editPressedBilling}
                autoCorrect={false}
                onChangeText={(billingAdd) => this.setState({ billingAdd })}
                value={this.state.billingAdd}
              ></TextInput>
            </View>
          </View>
          {this.state.errorMessageEmail ? (
            <Text style={styles.errorText}>
              {" "}
              {this.state.errorMessageEmail}{" "}
            </Text>
          ) : null}
          <View style={styles.deliveryContainer}>
            <View style={styles.deliveryViewStyle}>
              <Text style={styles.textheaderStyle}>Email</Text>
              <TouchableOpacity onPress={() => this.onpressEditEmail()}>
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      this.state.editPressedEmail === true ? "#483d8b" : "#888",
                  }}
                >
                  {" "}
                  Add / Edit{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: 10,
                height: 80,
                width: windowWidth - 40,
                justifyContent: "center",
                paddingTop: 15,
              }}
            >
              <TextInput
                style={[
                  styles.addressInput,
                  {
                    backgroundColor: this.state.editPressedEmail
                      ? "#fff"
                      : "#eee",
                    color: this.state.editPressedEmail ? "#000" : "#777",
                    alignItems: this.multiline ? "flex-start" : "center",
                    height: 65,
                  },
                ]}
                multiline={true}
                dense={true}
                placeholder={"Email"}
                placeholderTextColor={"#999"}
                editable={this.state.editPressedEmail}
                selectTextOnFocus={this.state.editPressedEmail}
                autoCorrect={false}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              ></TextInput>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.totalPriceCont}>
          <View>
            <Text style={styles.textTotal}>Total</Text>
            <Text style={styles.textPrice}>{this.state.totalPrice} TL</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => this.onpressConfirm()}
          >
            <Text style={styles.textCheckout}>Confirm and Pay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 13,
    fontWeight: "400",
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
    backgroundColor: "#483d8b",
    height: windowHeight,
  },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#483d8b",
    height: 70,
  },
  deliveryContainer: {
    width: windowWidth - 40,
    backgroundColor: Platform.OS === "ios" ? "#faf9f9" : "#db545a",
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#faf9f9",
    height: 150,
    marginBottom: 15,
    shadowColor: "#555",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardContainer: {
    width: windowWidth - 40,
    backgroundColor: Platform.OS === "ios" ? "#faf9f9" : "#db545a",
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#faf9f9",
    height: 230,
    shadowColor: "#555",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  cardheaderViewStyle: {
    height: 60,
    justifyContent: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  cardNoViewStyle: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  cardNoTextStyle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  dateCVvViewStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  dateViewStyle: {
    //marginBottom: 5,
  },
  dateCVvViewStyle2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  scrollViewStyle: {
    height: windowHeight - 140,
    width: windowWidth,
    backgroundColor: "#f1f1f1",
    padding: 20,
    flex: 1,
  },
  deliveryViewStyle: {
    height: 60,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  textheaderStyle: {
    color: "#483d8b",
    fontSize: 17,
    fontWeight: "500",
  },
  addressInput: {
    width: windowWidth - 60,
    height: 40,
    //backgroundColor: "#eee",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingTop: 10,
  },
  textheaderViewStyle: {
    color: "#483d8b",
    borderWidth: 1,
    borderBottomColor: "#483d8b",
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 0,
    borderStartColor: "#e6e6e6",
  },
  MMStyle: {
    height: 30,
    width: 40,
    //backgroundColor: "#eee",
    paddingLeft: 9,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  slash: {
    paddingTop: 5,
  },
  CVVcontainer: {
    paddingRight: 5,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  CVVInputStyle: {
    //backgroundColor: "#eee",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    height: 30,
    marginTop: 5,
    width: 51,
  },
  totalPriceCont: {
    //position: "absolute",
    width: windowWidth,
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    bottom: 0,
  },
  checkoutBtn: {
    backgroundColor: "#483d8b",
    width: 200,
    height: 40,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textTotal: {
    fontWeight: "300",
    paddingBottom: 2,
  },
  textPrice: {
    fontWeight: "700",
  },
  textCheckout: {
    fontWeight: "400",
    fontSize: 17,
    color: "#fff",
  },
});
