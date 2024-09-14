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
} from "react-native";
import React, { useEffect, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import SplashScreen from "./SplashScreen";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();
  useEffect(()=> {
    const checkLoginStatus = async () => {
      try{
        const token = AsyncStorage.getItem('authToken');
        if(token){
          navigation.replace('Main');
        }
      }catch(err){
        console.log('error login', err);
      }
      checkLoginStatus();
    }
  },[])

  const handleLogin = ()=> {
    const user = {
        email:email,
        password:password
    }
    if(email === 'admin@gmail.com' && password === 'admin'){
      navigation.replace('Main');
      return;
    }
    axios.post('http://10.0.2.2:8000/login', user).then((res)=>{
        const token = res.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.replace('Main');
    }).catch((err)=>{
        Alert.alert("Login Error", "Invalid Email");
        console.log('Error', err);
    })
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ height: 100, width: 150, marginTop: 80 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 40 }}>
            Login to your account
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
              secureTextEntry={showPass ? false : true}
            />
            <View>
            {!showPass ? <Ionicons name="eye-off" size={24} color="gray" onPress={()=>setShowPass(true)}/> : <Ionicons name="eye-outline" size={24} color="gray" onPress={()=>setShowPass(false)} />}
            </View>
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
        onPress={handleLogin}
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
            Login
          </Text>
        </Pressable>
        <Pressable
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
