import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
    var previousComments =
      props.navigation.state.params.productComments.comments ?? [];
    previousComments =
      previousComments !== []
        ? previousComments.filter((a) => a.isValid !== false)
        : [];
    var Rate = 0;
    if (previousComments !== [])
      previousComments.map((a) => {
        Rate = Rate + a.rating;
        console.log(a.rating);
      });
    Rate = previousComments.length === 0 ? 0 : Rate / previousComments.length;
    this.state = {
      comments: previousComments ?? [],
      totalRate: Rate,
      totalComment: previousComments.length ?? 0,
      product: props.navigation.state.params.product,
      imageurl: props.navigation.state.params.imageurl,
    };

    this.goPostCommentScreen = this.goPostCommentScreen.bind(this);
  }

  goPostCommentScreen = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.props.navigation.push("PostComment", {
          product: this.state.product,
          imageurl: this.state.imageurl,
        });
      } else {
        Alert.alert(
          "Warning",
          "You Should Login to Post Comment",
          [
            {
              text: "Login",
              onPress: () => this.props.navigation.navigate("Login"),
              style: "cancel",
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "default",
            },
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.generalCont}>
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() =>
              this.props.navigation.push("ProductDetail", {
                product: this.state.product,
                imageurl: this.state.imageurl,
                totalReview: this.state.totalComment,
                rate: this.state.totalRate,
              })
            }
          >
            <Ionicons name="md-arrow-round-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.productCountText}>Product Comments</Text>
        </View>
        <View style={styles.rateCont}>
          <Text style={{ fontWeight: "600", fontSize: 15 }}>
            Product Comments
          </Text>
          <View style={styles.rateSecondPart}>
            <View style={styles.rateLeftCont}>
              <View style={styles.rateTotalRate}>
                <Text style={styles.rate}>
                  {this.state.totalRate.toFixed(1)}
                </Text>
                <FontAwesome
                  name="star"
                  size={20}
                  color="#ffa500"
                  style={{ paddingBottom: 7 }}
                />
              </View>
              <View>
                <Text>{this.state.totalComment} Comments</Text>
              </View>
            </View>
            <View style={styles.starCont}>
              <StarRating
                disabled={true}
                halfStarEnabled={true}
                halfStarColor={"#ffa500"}
                fullStarColor={"#ffa500"}
                starStyle={{ width: 40, height: 40, marginRight: 5 }}
                containerStyle={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "center",
                }}
                starSize={40}
                maxStars={5}
                rating={this.state.totalRate}
              />
            </View>
          </View>
        </View>
        <FlatList
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item._id.toString()}
          data={this.state.comments}
          style={styles.flatList}
          renderItem={({ item }) => {
            return (
              <View style={styles.commentCont}>
                <View style={styles.commentInfo}>
                  <StarRating
                    disabled={true}
                    halfStarEnabled={true}
                    halfStarColor={"#ffa500"}
                    fullStarColor={"#ffa500"}
                    starStyle={{ width: 15, height: 15, marginRight: 5 }}
                    containerStyle={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                    starSize={15}
                    maxStars={5}
                    rating={item.rating}
                  />
                  <Text style={{ color: "#00cc00", fontWeight: "500" }}>
                    Bought the product
                  </Text>
                  <AntDesign name="checkcircle" size={16} color="#00cc00" />
                </View>
                <Text numberOfLines={3}>{item.text}</Text>
              </View>
            );
          }}
        />
        <View style={styles.addComment}>
          <TouchableOpacity
            style={styles.addCommentBtn}
            onPress={() => this.goPostCommentScreen()}
          >
            <Text style={styles.textEvaluate}>Evaluate</Text>
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
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    width: windowWidth,
    height: 70,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 10,
  },
  backIcon: {
    marginRight: 95,
    marginLeft: 25,
  },
  productCountText: {
    fontSize: 16,
  },
  rate: {
    marginTop: 2,
    marginRight: 7,
    fontSize: 40,
    fontWeight: "bold",
  },
  rateCont: {
    backgroundColor: "#fff",
    width: windowWidth,
    height: 150,
    padding: 15,
    marginBottom: 15,
  },
  rateSecondPart: {
    width: windowWidth,
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  rateTotalRate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 15,
  },
  rateLeftCont: {
    flex: 1,
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  starCont: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  commentCont: {
    height: 120,
    width: windowWidth,
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentInfo: {
    display: "flex",
    flexDirection: "row",
    width: windowWidth / 1.6,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  addComment: {
    width: windowWidth,
    height: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 20,
    zIndex: 99,
    bottom: 0,
  },
  addCommentBtn: {
    backgroundColor: "#fff",
    width: 200,
    height: 40,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#483d8b",
    alignItems: "center",
    justifyContent: "center",
  },
  textEvaluate: {
    fontWeight: "400",
    fontSize: 17,
    color: "#483d8b",
  },
});
