import   React         from 'react';
import { useDispatch } from 'react-redux';

import { addToCart }  from '../cart/Slice/cartSlice';

import   shoppingCart  from '../../util/icons/shopping_cart_FILL0_wght400_GRAD0_opsz48.svg';

export const Product = (data) => {
    const {product}  =  data;
    const  dispatch  =  useDispatch();
    return (
        <div className="productCard">
            <img className="productImage" src={`${process.env.PUBLIC_URL}${product.thumbnail}`} alt={product.name}/>
            <h3>{product.name}</h3>
            <div className="productCard-footer">
                <span>{product.price}$</span>
                <button className='cartButton' onClick={() => dispatch(addToCart(product))}>
                    <img className="cartImage" src={shoppingCart}/>
                </button>
            </div>
        </div>
    );
};