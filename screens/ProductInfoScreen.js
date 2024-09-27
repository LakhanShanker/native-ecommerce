import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../redux/CartReducer";
const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const [wish, setWish] = useState(false);
  const navigation = useNavigation();
  const wishlist = useSelector((state) => state.cart.wishlist);
  const handleAddToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 5000);
  };
  useEffect(() => {
    const isAlreadyinWishlist = wishlist.filter(
      (prod) => prod.id === route?.params?.item?.id
    );
    if (isAlreadyinWishlist && isAlreadyinWishlist.length > 0) {
      setWish(true);
    }
  }, []);
  const handleBuyNow = (item) => {
    dispatch(addToCart(item));
    setTimeout(() => {
      navigation.navigate("Cart");
    }, 1000);
  };

  const handleWishList = (item) => {
    if (!wish) {
      setWish(true);
      dispatch(addToWishlist(item));
    } else {
      setWish(false);
      dispatch(removeFromWishlist(item));
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 5,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <FontAwesome name="microphone" size={24} color="black" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route?.params?.carouselImages.length === 1
          ? route?.params?.carouselImages?.map((item, index) => (
            <Pressable style={{ marginTop: 10 }}>
              <View
                style={{
                  padding: 20,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  zIndex: 1,
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "#C60C30",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    20%
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    borderRadius: 20,
                  }}
                >
                  <FontAwesome name="share" size={24} color="black" />
                </View>
              </View>
              <Image
                source={{ uri: item }}
                key={index}
                style={{
                  height,
                  width,
                  marginTop: -50,
                  resizeMode: "contain",
                }}
              />
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 20,
                  marginTop: "auto",
                  marginLeft: 20,
                }}
              >
                <AntDesign
                  onPress={() => handleWishList(route?.params.item)}
                  name={wish ? "heart" : "hearto"}
                  size={24}
                  color={wish ? "red" : "black"}
                />
              </View>
            </Pressable>
          ))
          : route?.params?.carouselImages?.map((item, index) => (
            <ImageBackground
              source={{ uri: item }}
              key={index}
              style={{ height, width, marginTop: 15, resizeMode: "contain" }}
            >
              <View
                style={{
                  padding: 20,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "#C60C30",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    20%
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    borderRadius: 20,
                  }}
                >
                  <FontAwesome name="share" size={24} color="black" />
                </View>
              </View>
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 20,
                  marginTop: "auto",
                  marginLeft: 20,
                }}
              >
                <AntDesign
                  onPress={() => handleWishList(route?.params.item)}
                  name={wish ? "heart" : "hearto"}
                  size={24}
                  color={wish ? "red" : "black"}
                />
              </View>
            </ImageBackground>
          ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route.params.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          ₹ {route.params.price}
        </Text>
      </View>
      <Text style={{ height: 1, borderWidth: 1, borderColor: "#D0D0D0" }} />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.size}
        </Text>
      </View>
      <Text style={{ height: 1, borderWidth: 1, borderColor: "#D0D0D0" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ marginVertical: 5, fontSize: 15, fontWeight: "bold" }}>
          Total: ₹ {route.params?.price}
        </Text>
        <Text style={{ color: "#00CED1" }}>
          Free Delivery Tomorrow by 3 PM. Order withnin 10hrs 25mins
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          gap: 5,
          alignItems: "center",
        }}
      >
        <Entypo name="location-pin" size={24} color="black" />
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Deliever to Lakhan - Pune 114014
        </Text>
      </View>
      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        In Stock
      </Text>
      <Pressable
        onPress={() => handleAddToCart(route?.params.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>}
      </Pressable>
      <Pressable
        onPress={() => handleBuyNow(route?.params.item)}
        style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
