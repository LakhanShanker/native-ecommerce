import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { addToCart } from '../redux/CartReducer'
import { useDispatch } from 'react-redux';

const ProductItem = ({item}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(()=>{
      setAddedToCart(false);
    },5000)
  }
  return (
   <Pressable style={{marginHorizontal:25, marginVertical:30}}>
        <Image source={{uri:item.image}} style={{width:150,height:150, resizeMode:'contain'}}/>
        <Text style={{width:150, marginTop:10}} numberOfLines={1}>{item.title}</Text>
        <View style={{marginTop:5, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>₹{item.price}</Text>
            <Text style={{color:'#FFC72C', fontWeight:'bold'}}>{item?.rating?.rate} ratings</Text>
        </View>
        <Pressable onPress={()=>handleAddToCart(item)}  style={{ backgroundColor:'#FFC72C', padding:10, borderRadius:20, justifyContent:'center', alignItems:'center', marginTop:10,marginHorizontal:10}}>
        {addedToCart ? (<Text>Added to Cart</Text>): (<Text>Add to Cart</Text>) }
        </Pressable>
   </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})