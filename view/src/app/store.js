import { configureStore } from '@reduxjs/toolkit';

import authReducer      from '../features/registration/Slice/authSlice';
import ProductsReducers from '../features/shop/Slice/productsSlice';

export default configureStore({
  reducer: {
    auth:     authReducer,
    products: ProductsReducers,
  },
});
