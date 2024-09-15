import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext';
import axios from 'axios';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { clearCart } from '../redux/CartReducer';
import RazorpayCheckout from 'react-native-razorpay';
const ConfirmationScreen = () => {
  const steps = [
    {title:'Address', content:'Address From'},
    {title:'Delivery', content:'Delivery Options'},
    {title:'Payment', content:'Payment Details'},
    {title:'Place Order', content:'Order Summary'},
  ]
  const [currentStep,setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [option, setOption] = useState(false);
  const [selectedoption, setSelectedOption] = useState('');
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pay  = async () => {
    try{
      const options = {
        description:'Adding to wallet',
        currency: 'INR',
        name: 'Amazon',
        key : 'rzp_test_E3GWYimxN7YMk8',
        amount: total*100,
        prefill:{
          email:'lakhanshanker12345@gmail.com',
          contact:'8899219809',
          name:'Lakhan Shanker'
        },
        theme:{color:'#f37254'}
      };
      const data = await RazorpayCheckout.open(options);
      const orderData = {
        userId : userId,
        cartItems : cart,
        totalPrice : total,
        shippingAddress : selectedAddress,
        paymentMethod : 'card'
      }
      const res = await axios.post('https://native-ecommerce.onrender.com/orders',orderData);
      if(res.status === 200){
        navigation.navigate('Order');
        dispatch(clearCart());
        setCurrentStep(0);
        setOption(false);
        setSelectedAddress('');
        console.log('Order created successfully', res.data.order);
      }
    }catch(err){
      console.log('Error in payment', err);
      
    }
  }
  const total = cart.map((item)=> item.price * item.quantity).reduce((cur,prev)=>cur+prev,0);
  useEffect(() => {
    fetchAddresses();
  }, []);
  useFocusEffect(
    useCallback(()=>{
      fetchAddresses();
    },[])
  );
  const fetchAddresses = async () => {
    try {
      const response = await axios(`https://native-ecommerce.onrender.com/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (err) {
      console.log("Error in fetching address", err);
    }
  };
  const handlePlaceOrder = async () => {
    try{
      const orderData = {
        userId : userId,
        cartItems : cart,
        totalPrice : total,
        shippingAddress : selectedAddress,
        paymentMethod : selectedoption
      }
      const res = await axios.post('https://native-ecommerce.onrender.com/orders',orderData);
      if(res.status === 200){
        navigation.navigate('Order');
        dispatch(clearCart());
        setCurrentStep(0);
        setOption(false);
        setSelectedAddress('');
        console.log('Order created successfully', res.data.order);
      }
      else{
        console.log('Error in creating order', res.data);
        
      }
    }catch(err){
      console.log("error in orders", err);
      
    }
  }
  return (
    <ScrollView style={{marginTop:10}}>
      <View style={{flex:1, paddingHorizontal:20, paddingTop:40}}>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom:20, justifyContent:'space-between'}}>
          {steps?.map((step, index)=>(
            <View key={index} style={{justifyContent:'center', alignItems:'center'}}>
              {
                index > 0 && (
                  <View style ={[{flex:1, height:2, backgroundColor:'green'}, index <= currentStep && {backgroundColor:'green'}]}/>
                )}
                <View style={[{
                  width:30, height:30, borderRadius:15, backgroundColor:'#ccc', justifyContent:'center', alignItems:'center'
                }, index < currentStep && {backgroundColor:'green'}]}>
                  {index < currentStep ?(<Text style={{fontSize:16, fontWeight:'bold', color:'white'}}> &#10003;</Text>) : (<Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>{index+1}</Text>)}
                </View>
                <Text style={{textAlign:'center',marginTop:8}}>{step.title}</Text>
              </View>
          ))}
        </View>
      </View>
      {
        currentStep === 0 && (
          <View style={{marginHorizontal:20}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>Select Delivery Address</Text>
            <Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("NewAddress");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
              {addresses?.map((item,index)=> (
                <Pressable key={index} onPress={()=> setSelectedAddress(item)} style={{borderWidth:1, borderColor:'#d0d0d0', padding:10, flexDirection:'row', gap:5,paddingBottom:15, alignItems:'center', marginVertical:8, borderRadius:6}}>
{(selectedAddress && selectedAddress._id === item._id) ? (<AntDesign name="checkcircleo" size={20} color="#008397" />) : (<Entypo name="circle" size={20} color="black" />)}
<View style={{marginLeft:10}}>
<View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Entypo name="location-pin" size={20} color="red" />
              </View>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo && item?.houseNo + ", "} {item?.landmark}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.street}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                India, {item?.city}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Mobile No : {item?.mobileNo}
              </Text>
              {item?.postalcode && (
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  Pincode : {item?.postalcode}
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Set as default</Text>
                </Pressable>
              </View>
<View>
  {selectedAddress && selectedAddress._id === item._id && (
    <Pressable onPress={()=>setCurrentStep(1)} style={{backgroundColor:'#008397',padding:10, borderRadius:20, justifyContent:"center", alignItems:'center', marginTop:10}}>
      <Text style={{textAlign:'center', color:'white'}}>Deliver to this Address</Text>
    </Pressable>
  )}
</View>
</View>
                </Pressable>
              ))}
            </Pressable>
          </View>
        )}

      {
        currentStep === 1 && (
          <View style={{marginHorizontal:20}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Choose your Delivery Options</Text>
            <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'white', padding:8, gap:7, borderColor:'#d0d0d0', borderWidth:1, marginTop:10}}>
            {option ? (<AntDesign name="checkcircleo" size={20} color="#008397" />) : (<Entypo onPress={()=> setOption(!option)} name="circle" size={20} color="gray"/>)}
            
            <Text style={{flex:1}}>
              <Text style={{color:'green', fontWeight:'bold'}}> Tomorrow by 10 PM</Text>{" "}
              - Free delivery with your Prime memberhsip
            </Text>
            </View>
            <Pressable onPress={()=> setCurrentStep(2)}  style={{backgroundColor:'#ffc72c', padding:10, borderRadius:20, justifyContent:'center', alignItems:"center", marginTop:15}}>
              <Text>Continue</Text>
            </Pressable>
          </View>
        )
      }
      {
        currentStep === 2 && (
          <View style={{marginHorizontal:20}}>
            <Text style={{fontSize:20, fontWeight:"bold"}}>Select your Payment Method</Text>
            <View style={{backgroundColor:'white', padding:8, borderColor:'#d0d0d0', borderWidth:1, flexDirection:'row', alignItems:'center', gap:7 ,marginTop:10}}>
            {selectedoption === 'cash' ? (<AntDesign name="checkcircleo" size={20} color="#008397" />) : (<Entypo onPress={()=> setSelectedOption('cash')} name="circle" size={20} color="gray"/>)}
            <Text> Cash on Delivery</Text>
            </View>
            <View style={{backgroundColor:'white', padding:8, borderColor:'#d0d0d0', borderWidth:1, flexDirection:'row', alignItems:'center', gap:7 ,marginTop:10}}>
            {selectedoption === 'card' ? (<AntDesign name="checkcircleo" size={20} color="#008397" />) : (<Entypo onPress={()=>{ setSelectedOption('card'); 
            Alert.alert('UPI/Debit card', "Pay Online", [{
              text:'Cancel',
              onPress: () => console.log('cancel pressed'),
            },{
              text:'OK',
              onPress: () => pay(),
            }])}} name="circle" size={20} color="gray"/>)}
            
            <Text> UPI/ Credit or Debit Card</Text>
            </View>
            <Pressable onPress={()=> setCurrentStep(3)}  style={{backgroundColor:'#ffc72c', padding:10, borderRadius:20, justifyContent:'center', alignItems:"center", marginTop:15}}>
              <Text>Continue</Text>
            </Pressable>
          </View>
        )
      }
      {
        currentStep === 3 && selectedoption === 'cash' && (
          <View style={{marginHorizontal:20}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Order Now</Text>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:8, backgroundColor:"white", padding:8, borderColor:'#d0d0d0', borderWidth:1, marginTop:10}}>
            <View>
              <Text style={{fontSize:17, fontWeight:'bold'}}>
                Save 5% and never run out
              </Text>
              <Text style={{fontSize:15, color:'gray', marginTop:5}}>
                Turn on auto deliveries
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </View>
            <View style={{backgroundColor:'white', padding:8, borderColor:'#d0d0d0', borderWidth:1, marginTop:8}}>
              <Text>Shipping to {selectedAddress?.name}</Text>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:8}}>
              <Text style={{fontSize:15, fontWeight:'500', color:'gray'}}>Items</Text>
              <Text style={{fontSize:16, color:'gray'}}>₹{total}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:8}}>
              <Text style={{fontSize:15, fontWeight:'500', color:'gray'}}>Delivery</Text>
              <Text style={{fontSize:16, color:'gray'}}>₹0</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:8}}>
              <Text style={{fontSize:20, fontWeight:'bold'}}>Order Total</Text>
              <Text style={{fontSize:16, color:'#c60c30', fontWeight:'bold'}}>₹{total}</Text>
            </View>
            </View>
            <View style={{backgroundColor:'white', padding:8, borderWidth:1, marginTop:10, borderColor:'#d0d0d0'}}>
              <Text style={{fontSize:16, color:'gray'}}>Pay with</Text>
              <Text style={{fontSize:16, fontWeight:'600', marginTop:7}}>Pay on Delivery (Cash)</Text>
            </View>
            <Pressable onPress={handlePlaceOrder} style={{backgroundColor:'#ffc72c', padding:10, borderRadius:20, justifyContent:'center', alignItems:'center', marginTop:20}}>
              <Text>Place your Order</Text>
            </Pressable>
          </View>
        )
      }
    </ScrollView>
  )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})