import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";
import tracker from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
var product;
var imageurl;
var selectedSizes = [];

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: false,
      modalVisible: false,
      initialTextandBorderColor: "#bbb",
      initialBgColor: "#fff",
      secondTextandBorderColor: "#483d8b",
      secondBgColor: "#483d8b99",
      size: 0,
      totalReview: props.navigation.state.params.totalReview,
      rate: props.navigation.state.params.rate,
      lastProduct: props.navigation.state.params.product,
    };
    product = props.navigation.state.params.product;
    imageurl = props.navigation.state.params.imageurl;
    product.size.map((element) => {
      var check = false;
      selectedSizes.push(check);
    });
    this.changeFavIcon = this.changeFavIcon.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.changeSizeSelected = this.changeSizeSelected.bind(this);
    this.addToCartMajor = this.addToCartMajor.bind(this);
    this.goComments = this.goComments.bind(this);
    this.goBackProductScreen = this.goBackProductScreen.bind(this);
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  changeFavIcon = () => {
    var item = product;
    console.log(item.icon);
    if (item.icon === "heart") {
      item.icon = "hearto";
    } else {
      item.icon = "heart";
    }
    product = item;
    if (this.state.favIcon === true) this.setState({ favIcon: false });
    else {
      this.setState({ favIcon: true });
    }
  };

  changeSizeSelected = (index1) => {
    selectedSizes.forEach(function (part, index) {
      this[index] = false;
    }, selectedSizes);
    selectedSizes[index1] = true;
    this.setState({ size: product.size[index1] });
    console.log(this.state.size);
  };

  goComments = async (product) => {
    try {
      if (product.commentId !== undefined) {
        const response = await tracker.get("comment/" + product.commentId);
        if (response.status === 200) {
          this.props.navigation.push("CommentScreen", {
            product: product,
            imageurl: imageurl,
            productComments: response.data,
          });
        } else {
          console.log(response.data.message);
        }
        console.log(response.data);
      } else {
        this.props.navigation.push("CommentScreen", {
          product: product,
          imageurl: imageurl,
          productComments: [],
        });
      }
    } catch (e) {
      console.log("Error ", e);
    }
  };

  addToCartMajor = async () => {
    var imageArr = [];
    imageArr[0] = imageurl;
    if (this.state.size === 0) {
      this.setModalVisible(true);
    } else {
      console.log(product);
      try {
        const value = await AsyncStorage.getItem("basketId");
        var response;
        console.log(value);
        if (value !== null) {
          response = await tracker.put("/basket/" + value, {
            size: this.state.size,
            name: product.brand + " " + product.name,
            quantity: 1,
            price: product.newprice,
            product: product._id,
            image: imageArr[0],
          });
        } else {
          response = await tracker.post("/basket", {
            productList: {
              productArray: [
                {
                  size: this.state.size,
                  name: product.brand + " " + product.name,
                  quantity: 1,
                  price: product.newprice,
                  product: product._id,
                  image: imageArr[0],
                },
              ],
            },
          });
        }
        console.log("response status", response.status);
        console.log("response message", response.data.message);
        console.log("response data", response.data);
        if (response.status === 200) {
          if (value === null) {
            await AsyncStorage.setItem("basketId", response.data._id);
          }
          this.setModalVisible(false);
          console.log(
            response.data.productList.productArray,
            response.data.productList.totalprice
          );
          this.props.navigation.push("Basket", {
            products: response.data.productList.productArray,
            totalPrice: response.data.productList.totalprice,
          });
          product.size.map((element, index) => {
            selectedSizes[index] = false;
          });
        } else {
          console.log(response.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  goBackProductScreen = async (gender, category) => {
    try {
      const response = await tracker.get(
        "product/" + "gender/" + gender + "/category/" + category
      );
      if (response.status === 200) {
        this.props.navigation.push("Products", {
          Products: response.data,
        });
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.generalCont}>
        <ScrollView style={styles.productDetailCont}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() =>
              this.goBackProductScreen(
                this.state.lastProduct.gender,
                this.state.lastProduct.category
              )
            }
          >
            <Ionicons name="md-arrow-round-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favIcon}
            onPress={() => this.changeFavIcon()}
          >
            <AntDesign name={product.icon} size={22} color="#483d8b" />
          </TouchableOpacity>
          <Image source={{ uri: imageurl }} style={styles.productImage} />
          <View style={styles.productSummaryCont}>
            <View style={styles.productSum}>
              <Text
                style={{ fontSize: 22, fontWeight: "700", marginBottom: 10 }}
              >
                {product.brand}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#bbb",
                  marginBottom: 10,
                }}
              >
                {product.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#bbb",
                  marginBottom: 10,
                }}
              >
                {product.description}
              </Text>
              <View style={styles.productRate}>
                <Text style={styles.rate}>{this.state.rate}</Text>
                <StarRating
                  disabled={true}
                  halfStarEnabled={true}
                  halfStarColor={"#ffa500"}
                  fullStarColor={"#ffa500"}
                  starStyle={{ width: 15, height: 15, marginRight: 5 }}
                  containerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  starSize={15}
                  maxStars={5}
                  rating={this.state.rate}
                />
                <TouchableOpacity
                  style={styles.reviews}
                  onPress={() => this.goComments(product)}
                >
                  <Text style={styles.reviewsText}>
                    | {this.state.totalReview}
                  </Text>
                  <Ionicons name="ios-arrow-forward" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.favsCont}>
              <TouchableOpacity
                onPress={() => this.changeFavIcon()}
                style={styles.favIcon2}
              >
                <AntDesign name={product.icon} size={20} color="#483d8b" />
              </TouchableOpacity>
              <Text>57B</Text>
            </View>
          </View>
          <View style={styles.stockCont}>
            <MaterialIcons name="storage" size={24} color="#483d8b" />
            <Text style={{ marginLeft: 5, marginRight: 5 }}>
              Count in Stock :{" "}
            </Text>
            <Text>{product.countInStock}</Text>
          </View>
          <View style={styles.sizeCont}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 20 }}>
              Size
            </Text>
            <TouchableOpacity
              style={styles.sizeInput}
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              {this.state.size === 0 ? (
                <Text style={styles.sizeText}>
                  Select{" ("}{" "}
                  {product.size.map((item, index) => {
                    if (index === product.size.length - 1) {
                      return <Text>{item}</Text>;
                    } else if (index == product.size.length - 2) {
                      return <Text>{item} ve </Text>;
                    } else {
                      return <Text>{item},</Text>;
                    }
                  })}{" "}
                  {")"}
                </Text>
              ) : (
                <Text style={styles.sizeText}>{this.state.size}</Text>
              )}
              <AntDesign name="down" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          style={{ margin: 0 }}
          onBackdropPress={() => this.setModalVisible(false)}
          isVisible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.addtoBasket}>
                  <Image source={{ uri: imageurl }} style={styles.minorImage} />
                  <View style={styles.productMinorDescr}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          marginBottom: 5,
                        }}
                      >
                        {product.brand}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: "#bbb",
                          marginBottom: 5,
                        }}
                      >
                        {product.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "400",
                          color: "#bbb",
                          marginBottom: 5,
                        }}
                      >
                        {product.description}
                      </Text>
                    </View>
                    <View style={styles.priceMinorCont}>
                      <View>
                        <Text
                          style={{
                            color: "#ddd",
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                            fontSize: 10,
                          }}
                        >
                          {product.price + 20} TL
                        </Text>
                        <Text
                          style={{
                            color: "#aaa",
                            fontSize: 12,
                          }}
                        >
                          {product.price} TL
                        </Text>
                      </View>
                      <View style={styles.actualPriceCont}>
                        <Text
                          style={{
                            color: "#aaa",
                            fontSize: 8,
                          }}
                        >
                          50% Discount on the Basket
                        </Text>
                        <Text
                          style={{
                            color: "#483d8b",
                            fontSize: 14,
                          }}
                        >
                          {product.newprice} TL
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => this.setModalVisible(false)}
                    >
                      <EvilIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "700",
                      marginBottom: 25,
                    }}
                  >
                    Size
                  </Text>
                  <View style={styles.minorSizes}>
                    {product.size.map((element, index) => {
                      return selectedSizes[index] ? (
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            borderColor: this.state.secondTextandBorderColor,
                            backgroundColor: this.state.secondBgColor,
                            padding: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                            marginRight: 8,
                          }}
                          onPress={() => this.changeSizeSelected(index)}
                        >
                          <Text
                            style={{
                              color: this.state.secondTextandBorderColor,
                              fontSize: 12,
                            }}
                          >
                            {element}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            borderColor: this.state.initialTextandBorderColor,
                            backgroundColor: this.state.initialBgColor,
                            padding: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                            marginRight: 8,
                          }}
                          onPress={() => this.changeSizeSelected(index)}
                        >
                          <Text
                            style={{
                              color: this.state.initialTextandBorderColor,
                              fontSize: 12,
                            }}
                          >
                            {element}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.checkoutLastBtn}
                  onPress={() => this.addToCartMajor()}
                >
                  <Text style={styles.textCheckout}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.totalPriceCont}>
          <View>
            <Text style={styles.textTotal}>Total</Text>
            <Text
              style={{
                color: "#bbb",
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
                fontSize: 10,
              }}
            >
              {product.price + 20} TL
            </Text>
            <Text style={styles.textPrice}>{product.newprice} TL</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => this.addToCartMajor()}
          >
            <Text style={styles.textCheckout}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  generalCont: {
    height: windowHeight,
  },
  productDetailCont: {
    height: windowHeight - 72,
    marginBottom: 70,
    width: windowWidth,
    backgroundColor: "#fff",
  },
  productImage: {
    width: windowWidth,
    height: windowHeight - 144,
  },

  favIcon: {
    position: "absolute",
    right: 30,
    top: 30,
    zIndex: 99,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 33,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  favIcon2: {
    marginRight: 5,
  },
  backIcon: {
    position: "absolute",
    left: 30,
    top: 45,
    zIndex: 99,
  },
  productSummaryCont: {
    width: windowWidth,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  productSum: {
    width: windowWidth / 1.8,
    height: 90,
    display: "flex",
    justifyContent: "space-evenly",
  },
  productRate: {
    display: "flex",
    flexDirection: "row",
  },
  rate: {
    marginTop: 2,
    marginRight: 7,
  },
  reviews: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 7,
    alignContent: "center",
    alignItems: "center",
  },
  reviewsText: {
    marginRight: 7,
  },
  favsCont: {
    width: windowWidth / 2,
    height: 72,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  totalPriceCont: {
    position: "absolute",
    width: windowWidth,
    height: 71,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 99,
    bottom: 0,
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
  checkoutBtn: {
    backgroundColor: "#483d8b",
    width: 200,
    height: 40,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  stockCont: {
    width: windowWidth,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  sizeCont: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  sizeInput: {
    width: windowWidth - 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  sizeText: {
    marginRight: 150,
  },
  centeredView: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
  },
  modalView: {
    display: "flex",
    justifyContent: "space-between",
    width: windowWidth,
    height: windowHeight / 2,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  priceCont: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    width: windowWidth / 2 - 20,
    justifyContent: "space-between",
  },
  actualPriceCont: {
    padding: 3,
    borderWidth: 1,
    borderColor: "#483d8b",
    borderRadius: 5,
    marginLeft: 15,
  },
  minorImage: {
    width: 80,
    height: 100,
    backgroundColor: "#000",
  },
  addtoBasket: {
    width: windowWidth - 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  productMinorDescr: {
    width: 250,
    marginLeft: 20,
    marginRight: 20,
  },
  priceMinorCont: {
    display: "flex",
    flexDirection: "row",
  },
  sizeMinorCont: {
    borderWidth: 1,
  },
  minorSizes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth - 40,
  },
  checkoutLastBtn: {
    backgroundColor: "#483d8b",
    width: windowWidth - 40,
    height: 40,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
