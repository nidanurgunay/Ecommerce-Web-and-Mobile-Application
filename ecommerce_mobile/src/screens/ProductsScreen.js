import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import {
  EvilIcons,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import MenuItem from "../Components/MenuItems";
import staticPages from "../Components/staticPages.json";
import { FlatList } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating";
import tracker from "../api/tracker";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
var Products = [];

export default class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    if (props.navigation.state.params.Products !== []) {
      Products = props.navigation.state.params.Products;
      Products.map((item) => {
        item["icon"] = "hearto";
      });
    }
    console.log(Products);
    this.state = {
      favIcon: false,
      product: Products,
      searchTerm: "",
      modalVisible: false,
      filtreModalVisible: false,
      sortTerm: "Suggested",
      sortValue: 0,
      filtreGender: "Default",
      filtreCategory: "Default",
    };
    this.changeFavIcon = this.changeFavIcon.bind(this);
    this.goProductDetail = this.goProductDetail.bind(this);
    this.searchOnCategory = this.searchOnCategory.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
    this.filtreProducts = this.filtreProducts.bind(this);
  }
  changeFavIcon = (id) => {
    var items = Products;
    var item = Products.find((a) => a._id === id);
    if (item.icon === "heart") {
      item.icon = "hearto";
    } else {
      item.icon = "heart";
    }
    items.map((a) => {
      if (a._id === id) a = item;
    });
    Products = items;
    if (this.state.favIcon === true) this.setState({ favIcon: false });
    else {
      this.setState({ favIcon: true });
    }
  };

  goProductDetail = async (item, index) => {
    try {
      if (item.commentId !== undefined) {
        const response = await tracker.get("comment/" + item.commentId);
        if (response.status === 200) {
          console.log(response.data);
          var count = 0;
          var rate = 0;
          response.data.comments.map((a) => {
            if (a.isValid !== false) {
              count = count + 1;
              rate = rate + a.rating;
            }
            rate = count !== 0 ? rate / count : 0;
          });
          this.props.navigation.push("ProductDetail", {
            product: item,
            imageurl: item.image[0],
            totalReview: count,
            rate: item.rate.toFixed(1),
          });
        }
      } else {
        this.props.navigation.push("ProductDetail", {
          product: item,
          imageurl: item.image[0],
          totalReview: 0,
          rate: 0,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  searchOnCategory = async () => {
    try {
      console.log(this.state.searchTerm.length);
      if (this.state.searchTerm.length >= 2) {
        var response;
        if (this.state.product.length < 12) {
          response = await tracker.get(
            "product/gender/" +
              this.state.product[0].gender +
              "/category/" +
              this.state.product[0].category +
              "/search/" +
              this.state.searchTerm
          );
        } else {
          response = await tracker.get(
            "product/all/search/" + this.state.searchTerm
          );
        }
        if (
          response.data !== [] &&
          response.data !== null &&
          response.data !== undefined &&
          response.data !== ""
        ) {
          if (response.status === 200) {
            this.props.navigation.push("Products", {
              Products: response.data,
            });
          } else {
            console.log(response.data.message);
          }
        } else {
          if (response.status === 200) {
            this.props.navigation.push("Products", {
              Products: [],
            });
          } else {
            console.log(response.data.message);
          }
        }
      } else {
        console.log("The search term length should be greater than 2");
      }
    } catch (e) {
      console.log(e);
    }
  };

  sortProducts = async () => {
    try {
      var response;
      if (this.state.product.length < 12) {
        switch (this.state.sortTerm) {
          case "Lowest Price":
            this.setState({ sortValue: 1 });
            response = await tracker.get(
              "product/gender/" +
                this.state.product[0].gender +
                "/category/" +
                this.state.product[0].category +
                "/price/1"
            );
            break;
          case "Highest Price":
            this.setState({ sortValue: -1 });
            response = await tracker.get(
              "product/gender/" +
                this.state.product[0].gender +
                "/category/" +
                this.state.product[0].category +
                "/price/-1"
            );
            break;
          case "Most Favorites":
            this.setState({ sortValue: -1 });
            response = await tracker.get(
              "product/gender/" +
                this.state.product[0].gender +
                "/category/" +
                this.state.product[0].category +
                "/rate/-1"
            );
            break;
          case "Suggested":
            break;
        }
      } else {
        switch (this.state.sortTerm) {
          case "Lowest Price":
            this.setState({ sortValue: 1 });
            response = await tracker.get("product/all/price/1");
            break;
          case "Highest Price":
            this.setState({ sortValue: -1 });
            response = await tracker.get("product/all/price/-1");
            break;
          case "Most Favorites":
            this.setState({ sortValue: -1 });
            response = await tracker.get("product/all/rate/-1");
            break;
          case "Suggested":
            break;
        }
      }
      if (response !== undefined) {
        if (response.data !== []) {
          if (response.status === 200) {
            this.setState({ modalVisible: false });
            this.props.navigation.push("Products", {
              Products: response.data,
            });
          } else {
            console.log(response.data.message);
          }
        }
      } else {
        this.setState({ modalVisible: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  filtreProducts = async () => {
    try {
      var response;
      switch (this.state.filtreGender) {
        case "Female":
          switch (this.state.filtreCategory) {
            case "Default":
              response = await tracker.get("product/gender/female");
              console.log(response.data);
              break;
            default:
              response = await tracker.get(
                "product/gender/female" +
                  "/category/" +
                  this.state.filtreCategory
              );
              console.log(response.data);
              break;
          }
          break;
        case "Male":
          switch (this.state.filtreCategory) {
            case "Default":
              response = await tracker.get("product/gender/male");
              console.log(response.data);
              break;
            default:
              response = await tracker.get(
                "product/gender/male/category/" + this.state.filtreCategory
              );
              console.log(response.data);
              break;
          }
          break;
        case "Default":
          switch (this.state.filtreCategory) {
            case "Default":
              break;
            default:
              response = await tracker.get(
                "product/category/" + this.state.filtreCategory
              );
              console.log(response.data);
              break;
          }
          break;
      }
      console.log(response.data);
      if (response !== undefined) {
        if (response.data !== []) {
          if (response.status === 200) {
            this.setState({ filtreModalVisible: false });
            this.props.navigation.push("Products", {
              Products: response.data,
            });
          } else {
            console.log(response.data.message);
          }
        }
      } else {
        this.setState({ filtreModalVisible: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.categoryContainer}>
        <View style={styles.startcontainer}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => this.props.navigation.navigate("Category")}
          >
            <Ionicons name="md-arrow-round-back" size={24} color="black" />
          </TouchableOpacity>
          <EvilIcons
            style={styles.searchIcon}
            name="search"
            size={20}
            color="#483d8b"
          />
          <TextInput
            placeholder={"Search for brand, product or category"}
            style={styles.textinput}
            onChangeText={(text) => this.setState({ searchTerm: text })}
            clearTextOnFocus={true}
            returnKeyType="search"
            onSubmitEditing={this.searchOnCategory}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.sortFilterCont}>
          <TouchableOpacity
            style={styles.filterSortbtn}
            onPress={() => this.setState({ filtreModalVisible: true })}
          >
            <Entypo
              name="sound-mix"
              size={24}
              color="#483d8b"
              style={styles.filterSortIcons}
            />
            <Text>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterSortbtn}
            onPress={() => this.setState({ modalVisible: true })}
          >
            <MaterialCommunityIcons
              name="sort"
              size={24}
              color="#483d8b"
              style={styles.filterSortIcons}
            />
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item._id.toString()}
            numColumns={2}
            style={styles.FlatList}
            data={this.state.product}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.productView}>
                  <TouchableOpacity
                    style={styles.productBtn}
                    onPress={() => this.goProductDetail(item, index)}
                  >
                    <TouchableOpacity
                      style={styles.favIcon}
                      onPress={() => this.changeFavIcon(item._id)}
                    >
                      <AntDesign name={item.icon} size={14} color="#483d8b" />
                    </TouchableOpacity>
                    <Image
                      style={styles.productImage}
                      source={{ uri: item.image[0] }}
                    />
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                      {item.brand}{" "}
                      <Text style={{ fontWeight: "normal" }}>{item.name}</Text>
                    </Text>
                    <View>
                      <StarRating
                        disabled={true}
                        halfStarEnabled={true}
                        halfStarColor={"#ffa500"}
                        fullStarColor={"#ffa500"}
                        starStyle={{ width: 12, height: 12, marginRight: 5 }}
                        containerStyle={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                        starSize={12}
                        maxStars={5}
                        rating={item.rate}
                      />
                    </View>
                    <View style={styles.priceCont}>
                      <View>
                        <Text
                          style={{
                            color: "#ddd",
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                            fontSize: 10,
                          }}
                        >
                          {item.price + 20} TL
                        </Text>
                        <Text
                          style={{
                            color: "#aaa",
                            fontSize: 12,
                          }}
                        >
                          {item.price} TL
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
                          {item.newprice} TL
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <Modal
          animationType="slide"
          style={{ margin: 0 }}
          onBackdropPress={() => this.setState({ modalVisible: false })}
          isVisible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalbtns}>
                  <TouchableOpacity
                    onPress={() => this.setState({ modalVisible: false })}
                  >
                    <Text style={{ color: "#483d8b" }}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.sortProducts}>
                    <Text style={{ color: "#483d8b" }}>Select</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.pickerCont}>
                  <Picker
                    selectedValue={this.state.sortTerm}
                    style={{
                      height: windowHeight / 2 - 60,
                      width: windowWidth - 40,
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ sortTerm: itemValue })
                    }
                  >
                    <Picker.Item label="Suggested" value="Suggested" />
                    <Picker.Item label="Lowest Price" value="Lowest Price" />
                    <Picker.Item label="Highest Price" value="Highest Price" />
                    <Picker.Item
                      label="Most Favorites"
                      value="Most Favorites"
                    />
                  </Picker>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal
          animationType="slide"
          style={{ margin: 0 }}
          onBackdropPress={() => this.setState({ filtreModalVisible: false })}
          isVisible={this.state.filtreModalVisible}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalbtns}>
                  <TouchableOpacity
                    onPress={() => this.setState({ filtreModalVisible: false })}
                  >
                    <Text style={{ color: "#483d8b" }}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.filtreProducts}>
                    <Text style={{ color: "#483d8b" }}>Select</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.pickerCont}>
                  <View style={styles.pickers}>
                    <Picker
                      selectedValue={this.state.filtreGender}
                      style={{
                        height: windowHeight / 2 - 60,
                        width: (windowWidth - 40) / 2,
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ filtreGender: itemValue })
                      }
                    >
                      <Picker.Item label="Default" value="Default" />
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="Male" value="Male" />
                    </Picker>
                    <Picker
                      selectedValue={this.state.filtreCategory}
                      style={{
                        height: windowHeight / 2 - 60,
                        width: (windowWidth - 40) / 2,
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ filtreCategory: itemValue })
                      }
                    >
                      <Picker.Item label="Default" value="Default" />
                      {this.state.filtreGender === "Female" ? (
                        <Picker.Item label="Heels" value="Heels" />
                      ) : (
                        <Picker.Item label="Classics" value="Classics" />
                      )}
                      <Picker.Item label="Sneakers" value="Sneakers" />
                      <Picker.Item label="Boots" value="Boots" />
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <MenuItem
          props={this.props}
          pageNo={staticPages["Menu Item"]["Categories"]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  categoryContainer: {
    height: windowHeight,
    backgroundColor: "#fff",
  },
  startcontainer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    width: windowWidth,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  backIcon: {
    marginLeft: 25,
  },
  searchIcon: {
    position: "absolute",
    left: 65,
    zIndex: 99,
    paddingTop: 17,
  },
  textinput: {
    flex: 5,
    fontSize: 16,
    borderColor: "#483d8b",
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    height: 35,
    paddingLeft: 25,
    backgroundColor: "#faf9f9",
    marginRight: 30,
    marginLeft: 20,
  },
  sortFilterCont: {
    width: windowWidth,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 82,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  filterSortbtn: {
    width: windowWidth / 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#ddd",
  },
  filterSortIcons: {
    marginRight: 10,
  },
  productImage: {
    width: windowWidth / 2 - 20,
    height: windowHeight / 2 - 50,
    zIndex: 0,
    borderRadius: 5,
    marginBottom: 5,
  },
  FlatList: {
    position: "absolute",
    top: 132,
    height: windowHeight - 185,
  },
  favIcon: {
    position: "absolute",
    right: 10,
    top: 10,
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
  productView: {
    width: windowWidth / 2,
    alignItems: "center",
    padding: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#f0f0f0",
  },
  productBtn: {
    display: "flex",
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
  },
  centeredView: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
  },
  modalView: {
    width: windowWidth,
    height: windowHeight / 2 - 50,
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
  modalbtns: {
    width: windowWidth - 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerCont: {
    width: windowWidth - 40,
    height: windowHeight / 2 - 50,
    alignItems: "center",
    justifyContent: "center",
  },
  pickers: {
    display: "flex",
    flexDirection: "row",
  },
});
