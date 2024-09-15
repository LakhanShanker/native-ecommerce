import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    const regex = /\S+@\S+\.\S+/;
    if(regex.test(email)){
      axios
      .post("https://native-ecommerce.onrender.com/register", user)
      .then((response) => {
        Alert.alert(
          "Registeration Successful",
          "We have sent you verification link to your mail id"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        if(error.message.includes('400')){
          Alert.alert(
            "Registeration failed",
            "User already registered"
          );
        }
        else{
          Alert.alert(
            "Registeration error",
            "Error occured during registeration"
          );
        }
        console.log("Registeration failed", error.message);
      });
    }
    else{
      Alert.alert('Invaild Email','Please enter valid email address')
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center", marginTop:20 }}
    >
      <View>
        <Image
          style={{ height: 100, width: 150, marginTop: 20 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      </View>
      <ScrollView>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
            Register to your account
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              backgroundColor: "#D0D0D0",
              marginTop: 30,
            }}
          >
            <Ionicons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={{
                color: "gray",
                width: "75%",
                marginVertical: 10,
                fontSize: name ? 20 : 18,
              }}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              backgroundColor: "#D0D0D0",
              marginTop: 30,
            }}
          >
            <Fontisto
              name="email"
              size={24}
              color="gray"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={{
                color: "gray",
                width: "75%",
                marginVertical: 10,
                fontSize: email ? 20 : 18,
              }}
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              backgroundColor: "#D0D0D0",
              marginTop: 30,
            }}
          >
            <AntDesign
              name="lock"
              size={24}
              color="gray"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={{
                color: "gray",
                width: "75%",
                marginVertical: 10,
                fontSize: password ? 20 : 18,
              }}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep me logged in</Text>
          <Text style={{ fontWeight: "500", color: "#007FFF" }}>
            Forgot Password
          </Text>
        </View>
        <View style={{ marginTop: 50 }} />
        <Pressable
        onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
            Already have an account? Sign in
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
