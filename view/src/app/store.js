import { configureStore } from '@reduxjs/toolkit';

import authReducer      from '../features/registration/Slice/authSlice';
import productsReducers from '../features/shop/Slice/productsSlice';
import cartSlice        from '../features/cart/Slice/cartSlice';

export default configureStore({
  reducer: {
    auth:     authReducer,
    products: productsReducers,
    cart:     cartSlice
  },
});
