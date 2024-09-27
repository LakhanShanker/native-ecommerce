import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";
const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item)=> item.price * item.quantity).reduce((cur,prev)=>cur+prev,0);
 const dispatch = useDispatch();
 const navigation = useNavigation();
 const increaseQuantity = (item) => {
  dispatch(incrementQuantity(item))
 }
 const decreaseQuantity =(item) => {
  dispatch(decrementQuantity(item));
 }
const deleteItem = (item) => {
  dispatch(removeFromCart(item));
}
  return (
     cart.length > 0 ? <ScrollView showsVerticalScrollIndicator={false}>
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
      <View style={{padding:10, flexDirection:'row', alignItems:'center'}}>
        <Text style={{fontSize:18, fontWeight:'bold'}}>Subtotal :</Text>
        <Text style={{fontSize:20, fontWeight:'bold'}}>{total}</Text>
      </View>
      <Text style={{marginHorizontal:10}}>EMI details Available</Text>
      <Pressable onPress={()=> navigation.navigate('Confirm')} style={{backgroundColor:'#ffc72c', padding:10,borderRadius:5, justifyContent:"center", alignItems:'center', marginTop:10, marginHorizontal:10}}>
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>
      <Text style={{height:1, borderColor:'#d0d0d0', borderWidth:1, marginTop:15}}/>
      <View style={{marginHorizontal:10}}>
          {
            cart.map((item,index)=> (
              <View key={index} style={{backgroundColor:'white', marginVertical:5, borderBottomColor:'#f0f0f0', borderLeftWidth:0, borderTopWidth:0, borderWidth:2, borderRightWidth:0}}>
                <Pressable style={{marginVertical:10, flexDirection:'row', justifyContent:'space-between'}}>
                  <View>
                    <Image style={{width:140, height:140, resizeMode:'contain'}} source={{uri: item.image}}/>
                  </View> 
                  <View>
                    <Text numberOfLines={2} style={{width:150, marginTop:10}}>{item.title}</Text>
                    <Text style={{marginTop:6, fontSize:20, fontWeight:"bold"}}>{item.price }</Text>
                    <Image style={{width:30, height:30, resizeMode:'contain'}} source={{uri:"https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png"}}/>
                    <Text style={{color:'green'}}>In Stock</Text>
                  </View>
                </Pressable>
                <Pressable style={{marginTop:15, marginBottom:10, flexDirection:'row', alignItems:'center', gap:10}}>
                  <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5, paddingHorizontal:10,borderRadius:7}}>
                    {item.quantity > 1 ? (
                       <Pressable onPress={()=> decreaseQuantity(item)} style={{backgroundColor:'#d0d0d0', padding:7,borderTopLeftRadius:6, borderBottomLeftRadius:6}}>
                      <Entypo name="minus" size={24} color="black" />
                      </Pressable>) : (
                        <Pressable onPress={()=> deleteItem(item)} style={{backgroundColor:'#d0d0d0', padding:7,borderTopLeftRadius:6, borderBottomLeftRadius:6}}>
                        <AntDesign name="delete" size={24} color="black" />
                        </Pressable>)}
                    
                    <Pressable style={{paddingVertical:6, paddingHorizontal:10, backgroundColor:'white'}}>
                      <Text>{item?.quantity}</Text>
                    </Pressable>
                    <Pressable onPress={()=>increaseQuantity(item)} style={{backgroundColor:'#d0d0d0', padding:7,borderTopLeftRadius:6, borderBottomLeftRadius:6}}>
                    <Entypo name="plus" size={24} color="black" />
                    </Pressable>
                  </View>
                  <Pressable onPress={()=> deleteItem(item)} style={{backgroundColor:'white', paddingHorizontal:8, paddingVertical:10, borderRadius:8, borderColor:'#c0c0c0', borderWidth:0.6}}>
                    <Text>Delete</Text>
                  </Pressable>
                </Pressable>
                <Pressable style={{flexDirection:'row', alignItems:'center', gap:10, paddingBottom:15}}>
                  <Pressable style={{backgroundColor:'white', paddingHorizontal:8, paddingVertical:10, borderRadius:8, borderColor:'#c0c0c0', borderWidth:0.6}}>
                    <Text>Save for Later</Text>
                  </Pressable>
                  <Pressable style={{backgroundColor:'white', paddingHorizontal:8, paddingVertical:10, borderRadius:8, borderColor:'#c0c0c0', borderWidth:0.6}}>
                    <Text>See more like this</Text>
                  </Pressable>
                </Pressable>
                </View>
            ))
          }
      </View>
    </ScrollView> : <View>
      <Text style={{marginTop:100, fontSize:20, fontWeight:'bold', textAlign:'center'}}>Ops nothing is added to cart</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
