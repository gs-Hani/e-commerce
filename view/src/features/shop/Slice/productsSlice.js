import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories } from '../../../util/fetch/Products';

const initialState = {
    productsList: [],
    categories:   [],
    error1:       null,
    error2:       null,
    status1:     'idle',
    status2:     'idle'
};

export const loadProducts = createAsyncThunk('products/loadProducts',     async() => {
    const    response     = await fetchProducts();
    return   response
});

export const loadCategories = createAsyncThunk('products/loadCategories', async() => {
    const    response       = await fetchCategories();
    return   response
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        //loadProducts===========================================
        .addCase(loadProducts.pending,   (state)         => {
            state.status1      = 'loading';
        })
        .addCase(loadProducts.fulfilled, (state,action)  => {
            state.productsList =  action.payload;
            state.status1      = 'succeeded';
        })
        .addCase(loadProducts.rejected,  (state, action) => {
            state.error1       =  action.error.message;
            state.status1      = 'failed';
        })
        //loadCategories===========================================
        .addCase(loadCategories.pending,   (state)         => {
            state.status2    = 'loading';
        })
        .addCase(loadCategories.fulfilled, (state,action)  => {
            state.categories =  action.payload;
            state.status2    = 'succeeded';
        })
        .addCase(loadCategories.rejected,  (state, action) => {
            state.error2     =  action.error.message;
            state.status2    = 'failed';
        })
    }
});

export default productsSlice.reducer;