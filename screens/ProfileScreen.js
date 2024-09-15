import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00ced1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
        ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications" size={24} color="black" />
          <FontAwesome name="search" size={24} color="black" />
        </View>
    ),
    });
  }, []);
  const [user, setUser] = useState('');
  useEffect(()=>{
    const fetchUserProfile = async () => {
      try{
        const res = await axios.get(`https://native-ecommerce.onrender.com/profile/${userId}`);
        const {user} = res.data;
        setUser(user);
      }catch(err){
        console.log('Error in fetching profile', err);
      }
    }
    fetchUserProfile();
  },[])
  const logout = () => {
    Alert.alert('Logout', "You want to Logout", [{
      text:'Cancel',
      onPress: () => console.log('cancel logout'),
    },{
      text:'OK',
      onPress: () => clearAuthToken(),
    }])
    
  }
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('Auth token cleared');
    navigation.replace('Login');
  }
  const [order, setOrder] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=> {
    const fetchOrders = async () => {      
      try{
        const res = await axios.get(`https://native-ecommerce.onrender.com/orders/${userId}`);
        console.log(res);
        
        const orders = res.data.orders;
        setOrder(orders);
        setLoading(false)
      }catch(err){
        console.log('errer fetching order', err); 
      }
    }
    fetchOrders();
  },[])
  setTimeout(()=>{
    setLoading(false);
  },3000)
  return (
    <ScrollView style={{padding:10, flex:1, backgroundColor:'white'}}>
      <Text style={{fontSize:16, fontWeight:'bold'}}>Welcome {user?.name}</Text>
      <View style={{flexDirection:'row', alignItems:'center', gap:10, marginTop:10}}>
        <Pressable style={{padding:10, backgroundColor:'#e0e0e0', borderRadius:25,flex:1}}>
          <Text style={{textAlign:'center'}}>Your Orders</Text>
        </Pressable>
        <Pressable style={{padding:10, backgroundColor:'#e0e0e0', borderRadius:25,flex:1}}>
          <Text style={{textAlign:'center'}}>Your Account</Text>
        </Pressable>
      </View>
      <View style={{flexDirection:'row', alignItems:'center', gap:10, marginTop:10}}> 
        <Pressable style={{padding:10, backgroundColor:'#e0e0e0', borderRadius:25,flex:1}}>
          <Text style={{textAlign:'center'}}>Buy Again</Text>
        </Pressable>
        <Pressable onPress={logout} style={{padding:10, backgroundColor:'#e0e0e0', borderRadius:25,flex:1}}>
          <Text style={{textAlign:'center'}}>Logout</Text>
        </Pressable>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {loading ? (<View style={{flex: 1, justifyContent:'center', paddingTop:30}}>
      <ActivityIndicator size="large" />
    </View>): order.length > 0 ? (
          order.map((item, index)=> (
            <Pressable key={index} style={{marginTop:20, padding:15, borderRadius:8, borderWidth:1, borderColor:'#d0d0d0', marginHorizontal:10, justifyContent:'center', alignItems:'center'}}>
              {item.products.slice(0,1).map((product)=>(
                <View key={product.id}>
                  <Image style={{width:100, height:100, resizeMode:'contain'}} source={{uri:product.image}}/>
                </View>
              ))}
            </Pressable>
          ))
        ) : (<Text  style={{textAlign:'center', fontSize:16, fontWeight:'bold'}}>No Order Found</Text>)}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
