import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCart,
    //  addItem, removeItem, updateItem, checkout
    } from '../../../util/fetch/Cart';

const initialState = {
    cartProducts: [],
    error:        null,
    status:      'idle'
};

export const loadCart   = createAsyncThunk('cart/loadCart', async(user_id) => {
    const    response = await fetchCart(user_id);
    return   response
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state,action) {
            if(!state.cartProducts.find(product => product.product_id === action.payload.product_id)) {
                state.cartProducts.push(action.payload);
            }
        },
        removeFromCart(state,action) {
            let theIndex;
            state.cartProducts.find(({product_id}, index) => {
                if ( product_id === action.payload.product_id) { theIndex = index } })
            state.cartProducts.splice(theIndex,1);
        }
    },
    extraReducers(builder) {
        builder
        //loadCart============================
        .addCase(loadCart.pending,   (state)         => {
            state.status       = 'loading';
        })
        .addCase(loadCart.fulfilled, (state,action)  => {
            state.cartProducts =  action.payload;
            state.status       = 'succeeded';
        })
        .addCase(loadCart.rejected,  (state, action) => {
            state.error        =  action.error.message;
            state.status       = 'failed';
        })
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;