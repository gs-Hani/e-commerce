import   React                       from 'react';
import { useDispatch, useSelector }  from 'react-redux';

import { addToCart } from '../../features/cart/Slice/cartSlice';

import   shoppingCart   from '../../util/icons/shopping_cart_FILL0_wght400_GRAD0_opsz48.svg';

import './cartButton.css';

export const CartButton = (state) => {
    const { product_id }   = state;
    const { cartProducts } = useSelector(state => state.cart);
    const   dispatch       = useDispatch();
    return (
        <button className='cartButton' onClick={() => dispatch(addToCart({product_id,cartProducts}))}>
            <img className="cartImage" src={shoppingCart}/>
        </button>
    )

};