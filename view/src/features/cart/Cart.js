import   React, { useEffect } from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { removeFromCart }     from '../cart/Slice/cartSlice';

import './Cart.css';

export const Cart = () => {
    
    const { cartProducts, error, status } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => console.log() ,[cartProducts,status]);

    const cartProductsList = (cartProducts, error, status) => {
        if      (status === 'loading') { return (<p>...Loading</p>); }
        else if (status === 'failed')  { return (<p>{error}</p>); }
        else    {
            return cartProducts.map((product,index) => {
                return <li key ={index}>
                        <div onClick={() => dispatch(removeFromCart(product))}>
                            <img src={product.thumbnail}/>
                        </div>
                       </li>
            })
        }
    }

    return (
        <ul id='shop-cart'>
            <h2>cart</h2>
            {cartProducts && cartProductsList(cartProducts, error, status)}
        </ul>
    )
    
};
