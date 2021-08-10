import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import MenuItems from "../Components/MenuItems";
import staticPages from "../Components/staticPages.json";
import tracker from "../api/tracker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
    this.searchAllProducts = this.searchAllProducts.bind(this);
  }

  searchAllProducts = async () => {
    try {
      console.log(this.state.searchTerm.length);
      if (this.state.searchTerm.length >= 2) {
        const response = await tracker.get(
          "product/all/search/" + this.state.searchTerm
        );
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
  render() {
    const categoryItems = [
      { name: "Women" },
      { name: "Men" },
      { name: "Sport" },
      { name: "Men Classic" },
      { name: "Women Court Shoes" },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.startcontainer}>
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
            returnKeyType="search"
            onSubmitEditing={this.searchAllProducts}
            clearButtonMode="while-editing"
          />
          <Ionicons
            name="ios-notifications-outline"
            size={28}
            color="#483d8b"
            style={styles.notificationIcon}
          />
        </View>
        <View style={styles.flatViewCategory}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(categoryItem) => categoryItem.name}
            data={categoryItems}
            renderItem={({ item }) => {
              return (
                <View style={styles.flatListCategoryView}>
                  <Text>{item.name}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.bannerCont}>
          <View style={styles.imageCont}>
            <Image
              source={require("../images/campaign1.jpg")}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.imageCont}>
            <Image
              source={require("../images/campaign2.jpg")}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.imageCont}>
            <Image
              source={require("../images/campaign3.jpg")}
              style={styles.imageStyle}
            />
          </View>
        </View>
        <MenuItems
          props={this.props}
          pageNo={staticPages["Menu Item"]["Home Page"]}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#faf9f9",
  },
  flatViewCategory: {
    position: "absolute",
    top: 65,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  flatListCategoryView: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#483d8b",
    paddingBottom: 10,
  },
  notificationIcon: {
    flex: 1,
  },
  searchIcon: {
    position: "absolute",
    left: 35,
    zIndex: 99,
    paddingTop: 30,
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
  },
  flatmenuItemView: {
    alignItems: "center",
    justifyContent: "center",
  },
  flatmenuItem: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    width: windowWidth,
    paddingTop: 7,
    paddingBottom: 7,
  },
  menuItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  menuItemIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    fontSize: 11,
  },
  Icon: {
    marginLeft: 28,
    marginRight: 28,
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
    marginLeft: 30,
  },
  bannerCont: {
    height: windowHeight - 40,
    width: windowWidth,
    marginTop: 170,
  },
  imageCont: {
    width: windowWidth,
    height: 190,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  imageStyle: {
    height: 160,
    width: windowWidth - 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
  },
});
