import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCart, addItem ,removeItem,// updateItem, checkout
    } from '../../../util/fetch/Cart';

const initialState = {
    cartProducts: [],
    error:        null,
    status:      'idle'
};

export const loadCart = createAsyncThunk('cart/loadCart', async(user_id) => {
    const  response = await fetchCart(user_id);
    return response
});

export const addToCart = createAsyncThunk('cart/addToCart', async(data) => {
    const {product_id,cartProducts} = data;
    console.log(data)
    if(!cartProducts.find(p => p == product_id)) {
        await addItem(product_id);
        return  {index:product_id, exists:false}
    } else {
        return {exists:true}
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async(data) => {
    const {product_id,cartProducts} = data;
    if(cartProducts.find(p => p == product_id)) {
        console.log('found');
        await removeItem(product_id);
        return  {product_id, exists:true}
    } else {
        return {exists:false}
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        //loadCart============================
        .addCase(loadCart.pending,   (state)         => {
            state.status       = 'loading';
        })
        .addCase(loadCart.fulfilled, (state,action)  => {
            state.cartProducts = action.payload;
            console.log(action.payload);
            action.payload === [] ? state.status = 'idle':  state.status = 'succeeded';
        })
        .addCase(loadCart.rejected,  (state, action) => {
            state.error        =  action.error.message;
            state.status       = 'failed';
        })
        //addToCart========================
        .addCase(addToCart.fulfilled, (state,action)  => {
            const { index,exists } =  action.payload;
            // console.log(action.payload);
            if(!exists) { state.cartProducts.push(index); }
        })
        .addCase(addToCart.rejected,  (state, action) => {
            console.log(action.error.message);
        })
        //removeFromCart==================
        .addCase(removeFromCart.fulfilled, (state,action) => {
            const { product_id,exists } =  action.payload;
            if(exists) { 
                const index = state.cartProducts.indexOf(product_id); 
                state.cartProducts.splice(index, 1);
            }
        })
        .addCase(removeFromCart.rejected, (state,action) => {
            console.log(action.error.message);
        })
    }
});

export default cartSlice.reducer;