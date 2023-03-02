import   React         from 'react';
import { useDispatch } from 'react-redux';

import { addToCart }   from '../../features/cart/Slice/cartSlice';

import   shoppingCart  from '../../util/icons/shopping_cart_FILL0_wght400_GRAD0_opsz48.svg';

import './cartButton.css';

export const CartButton = (state) => {
    const { product } =  state
    const   dispatch  =  useDispatch();
    return (
        <button className='cartButton' onClick={() => dispatch(addToCart(product))}>
            <img className="cartImage" src={shoppingCart}/>
        </button>
    )

};