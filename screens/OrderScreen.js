import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

const OrderScreen = () => {
    const navigation = useNavigation();
    useEffect(()=> {
        setTimeout(()=>{
            navigation.replace('Main');
        },1300)
    },[])
  return (
    <SafeAreaView>
        <LottieView autoPlay loop={false} speed={0.7} source={require('../assets/thumbs.json')} style={{height:260, width:300, alignSelf:'center', marginTop:40, justifyContent:'center'}} />
<Text style={{marginTop:20, fontSize:18, fontWeight:'600', textAlign:'center'}}>Your order has been Received.</Text>
       <LottieView autoPlay loop={false} speed={0.7} source={require('../assets/sparkle.json')} style={{height:300, width:300,position:'absolute', top:100,alignSelf:'center'}} />
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})