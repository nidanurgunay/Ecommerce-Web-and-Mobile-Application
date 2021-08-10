import React, { Component } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import MenuItem from "../Components/MenuItems";
import CategoryList from "../Components/CategoryList";
import staticPages from "../Components/staticPages.json";
import tracker from "../api/tracker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maleButtonBorderColor: "#55555511",
      femaleButtonBorderColor: "#483d8b",
      maleButtonBgColor: "#55555511",
      femaleButtonBgColor: "#fff",
      maleTextColor: "#aaa",
      femaleTextColor: "#483d8b",
      femalePressed: true,
      malePressed: false,
      errorMessage: "",
      searchTerm: "",
    };
    this.changeFemalecolor = this.changeFemalecolor.bind(this);
    this.changeMalecolor = this.changeMalecolor.bind(this);
    this.searchAllProducts = this.searchAllProducts.bind(this);
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
    this.forceUpdate();
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
    this.forceUpdate();
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
    return (
      <View style={styles.categoryContainer}>
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
            clearTextOnFocus={true}
            returnKeyType="search"
            onSubmitEditing={this.searchAllProducts}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.genderView}>
          <TouchableOpacity
            style={{
              borderColor: this.state.femaleButtonBorderColor,
              backgroundColor: this.state.femaleButtonBgColor,
              width: windowWidth / 2,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
            }}
            onPress={() => this.changeFemalecolor()}
          >
            <Text style={{ color: this.state.femaleTextColor }}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: this.state.maleButtonBorderColor,
              backgroundColor: this.state.maleButtonBgColor,
              width: windowWidth / 2,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
            }}
            onPress={() => this.changeMalecolor()}
          >
            <Text style={{ color: this.state.maleTextColor }}>Male</Text>
          </TouchableOpacity>
        </View>
        <CategoryList props={this.props} check={this.state.femalePressed} />
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
  },
  searchIcon: {
    position: "absolute",
    left: 35,
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
    marginLeft: 30,
  },
  genderView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 35,
    width: windowWidth,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "relative",
    top: 45,
  },
});
