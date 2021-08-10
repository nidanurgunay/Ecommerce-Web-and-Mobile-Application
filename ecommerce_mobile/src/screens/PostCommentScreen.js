import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { AntDesign, EvilIcons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import { TextInput } from "react-native-gesture-handler";
import tracker from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class PostCommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.navigation.state.params.product,
      imageurl: props.navigation.state.params.imageurl,
      rate: 0,
      comment: "",
      postCheck: false,
    };
    this.PostComment = this.PostComment.bind(this);
  }

  PostComment = async () => {
    try {
      console.log(this.state.product);
      console.log(this.state.rate);
      console.log(this.state.comment);
      var response;
      const userId = await AsyncStorage.getItem("userid");
      if (this.state.product.commentId !== undefined) {
        response = await tracker.put(
          "/comment/" + this.state.product.commentId,
          {
            user: userId,
            rating: this.state.rate,
            text: this.state.comment,
          }
        );
      } else {
        response = await tracker.post("/comment", {
          product: this.state.product._id,
          totalRate: this.state.rate,
          comments: [
            {
              user: userId,
              rating: this.state.rate,
              text: this.state.comment,
            },
          ],
        });
        if (response.status === 200) {
          var newProduct = this.state.product;
          newProduct["commentId"] = response.data._id;
          this.setState({ product: newProduct });
          console.log(this.state.product.commentId);
        }
      }
      console.log(response.data);
      if (response.status === 200) {
        this.setState({ postCheck: true });

        setTimeout(() => {
          this.props.navigation.push("CommentScreen", {
            product: this.state.product,
            imageurl: this.state.imageurl,
            productComments: response.data,
          });
          this.setState({ postCheck: false });
        }, 2000);
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
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => this.props.navigation.navigate("CommentScreen")}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.productCountText}>Product Comments</Text>
        </View>
        <View style={styles.contentCont}>
          <View style={styles.productCont}>
            <Image
              source={{ uri: this.state.imageurl }}
              style={styles.imageCont}
            />
            <View style={styles.productDetailTexts}>
              <Text style={{ fontWeight: "600" }}>
                {this.state.product.brand + " " + this.state.product.name}
              </Text>
              <Text>{this.state.product.description}</Text>
              <Text style={{ fontWeight: "600", color: "#483d8b" }}>
                {this.state.product.price + " TL"}
              </Text>
            </View>
          </View>
          <View style={styles.rateCont}>
            <Text style={{ fontWeight: "600" }}>
              You can rate the product below and write a comment.
            </Text>
            <StarRating
              disabled={false}
              emptyStarColor={"#ddd"}
              maxStars={5}
              rating={this.state.rate}
              selectedStar={(rating) =>
                this.setState({
                  rate: rating,
                })
              }
              starStyle={{ width: 40, height: 40, marginRight: 5 }}
              containerStyle={{
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "center",
                width: windowWidth - 40,
              }}
              starSize={40}
              halfStarColor={"#ffa500"}
              fullStarColor={"#ffa500"}
              halfStarEnabled={true}
            />
          </View>
          <View style={styles.commentCont}>
            <Text style={{ fontWeight: "600" }}>Evaluate The Product</Text>
            <TextInput
              style={styles.commentInput}
              onChangeText={(text) =>
                this.setState({
                  comment: text,
                })
              }
              multiline={true}
              disableFullscreenUI={true}
              numberOfLines={2}
              placeholder={
                "The product is both affordable and of high quality as it seems."
              }
              placeholderTextColor={"#888"}
              blurOnSubmit={true}
            />
          </View>
          {this.state.postCheck ? (
            <View style={styles.thkyouCont}>
              <EvilIcons name="check" size={70} color="#483d8b" />
              <Text
                style={{ color: "#483d8b", fontWeight: "500", fontSize: 18 }}
              >
                Thank you for your review
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.addComment}>
          <TouchableOpacity
            style={styles.addCommentBtn}
            onPress={() => this.PostComment()}
          >
            <Text style={styles.textEvaluate}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    width: windowWidth,
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 5,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  backIcon: {
    marginRight: 95,
    marginLeft: 25,
  },
  productCountText: {
    fontSize: 16,
  },
  contentCont: {
    width: windowWidth,
    height: windowHeight - 130,
    padding: 20,
    backgroundColor: "#fff",
  },
  productCont: {
    height: 130,
    width: windowWidth - 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 20,
  },
  imageCont: {
    height: 90,
    width: 70,
    marginRight: 20,
  },
  productDetailTexts: {
    height: 80,
    width: windowWidth - 130,
    justifyContent: "space-around",
  },
  rateCont: {
    height: 130,
    width: windowWidth - 40,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  commentCont: {
    height: 160,
    justifyContent: "space-between",
  },
  commentInput: {
    height: 130,
    width: windowWidth - 40,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
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
    backgroundColor: "#483d8b",
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
    color: "#fff",
  },
  thkyouCont: {
    height: 100,
    width: windowWidth - 40,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
