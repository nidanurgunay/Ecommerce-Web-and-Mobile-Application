import React from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tracker from "../api/tracker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CategoryList = ({ props, check }) => {
  const onPressCategory = async (gender, category) => {
    try {
      const response = await tracker.get(
        "product/" + "gender/" + gender + "/category/" + category
      );
      if (response.status === 200) {
        props.navigation.push("Products", {
          Products: response.data,
        });
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onPressGetAll = async (gender) => {
    try {
      const response = await tracker.get("product/" + "gender/" + gender);
      if (response.status === 200) {
        props.navigation.push("Products", {
          Products: response.data,
        });
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.categoryCont}>
      {check ? (
        <View style={styles.categories}>
          <TouchableOpacity
            style={styles.categorybtn}
            onPress={() => onPressCategory("female", "Heels")}
          >
            <View style={styles.categoryImage}>
              <Image
                source={require("../images/kadıntopuklu.jpg")}
                style={styles.ProductImage}
              />
            </View>
            <Text style={styles.categoryText}>Heelers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categorybtn}
            onPress={() => onPressCategory("female", "Sneakers")}
          >
            <View style={styles.categoryImage}>
              <Image
                source={require("../images/kadınspor.jpeg")}
                style={styles.ProductImage}
              />
            </View>
            <Text style={styles.categoryText}>Sneakers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categorybtn}
            onPress={() => onPressCategory("female", "Boots")}
          >
            <View style={styles.categoryImage}>
              <Image
                source={require("../images/kadınbot.jpg")}
                style={styles.ProductImage}
              />
            </View>
            <Text style={styles.categoryText}>Boots</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.categories}>
          <TouchableOpacity
            style={styles.categorybtn}
            onPress={() => onPressCategory("male", "Boots")}
          >
            <View style={styles.categoryImage}>
              <Image
                source={require("../images/erkekbot.jpeg")}
                style={styles.ProductImage}
              />
            </View>
            <Text style={styles.categoryText}>Boots</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categorybtn}
            onPress={() => onPressCategory("male", "Classics")}
          >
            <View style={styles.categoryImage}>
              <Image
                source={require("../images/erkekklasik.jpeg")}
                style={styles.ProductImage}
              />
            </View>
            <Text style={styles.categoryText}>Classics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categorybtn}
            onPress={() => onPressCategory("male", "Sneakers")}
          >
            <View style={styles.categoryImage}>
              <Image
                source={require("../images/erkekspor.jpeg")}
                style={styles.ProductImage}
              />
            </View>
            <Text style={styles.categoryText}>Sneakers</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.allProductsCont}>
        <TouchableOpacity
          style={styles.allProductbtn}
          onPress={() => onPressGetAll(check ? "female" : "male")}
        >
          <AntDesign name="appstore-o" size={40} color="#fff" />
          <Text style={styles.allProductText}>All Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCont: {
    width: windowWidth,
    height: windowHeight - 180,
    position: "absolute",
    top: 130,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  categories: {
    width: windowWidth,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  ProductImage: {
    height: 180,
    width: 110,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
  },
  categorybtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
  },
  allProductsCont: {
    width: windowWidth - 50,
    alignItems: "center",
    justifyContent: "center",
  },
  allProductbtn: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth - 100,
    height: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#483d8b",
  },
  allProductText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    marginTop: 15,
  },
});

export default CategoryList;
