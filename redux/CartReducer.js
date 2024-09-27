import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[],
        wishlist:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            const itemPresent = state.cart.find((item)=> item.id === action.payload.id);
            if(itemPresent){
                itemPresent.quantity++;
            }else{
                state.cart.push({...action.payload, quantity:1});
            }
        },
        removeFromCart:(state,action)=>{
            const removeItem = state.cart.filter((item)=> item.id !== action.payload.id);
            state.cart = removeItem;
        },
        incrementQuantity:(state,action)=>{
            const itemPresent = state.cart.find((item)=> item.id === action.payload.id);
            if(itemPresent){
                itemPresent.quantity++;
            }
        },
        decrementQuantity:(state,action)=>{
            const itemPresent = state.cart.find((item)=> item.id === action.payload.id);
            if(itemPresent.quantity === 1){
                itemPresent.quantity = 0;
                const removeItem = state.cart.filter((item)=> item.id !== action.payload.id);
                state.cart = removeItem;
            }
            else{
                itemPresent.quantity--;
            }
        },
        clearCart:(state)=>{
            state.cart=[];
        },
        addToWishlist:(state,action)=>{
                state.wishlist.push(action.payload);
        },
        removeFromWishlist:(state,action)=>{
            const removeItem = state.wishlist.filter((item)=> item.id !== action.payload.id);
            state.wishlist = removeItem;
        },
    }
})

export const { addToCart,removeFromCart,incrementQuantity,decrementQuantity,clearCart, addToWishlist, removeFromWishlist} = CartSlice.actions;

export default CartSlice.reducer;
