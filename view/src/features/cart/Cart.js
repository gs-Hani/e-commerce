import   React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { removeFromCart }     from './Slice/cartSlice';

import './Cart.css';

export const Cart = () => {
    
    let   { cartProducts, error, status } = useSelector(state => state.cart);
    const { productsList }  = useSelector(state => state.products);
    const [ productsAsObjects, setproductsAsObjects ] = useState([]);
    const   dispatch        = useDispatch();

    useEffect(() => {
        objectifyProducts(cartProducts);
        console.log(productsAsObjects,status);
    } ,[cartProducts]);

    async function objectifyProducts (cartProducts) {
        const list = await cartProducts.map(
            product => productsList.find(
                item => item.product_id == product));
        setproductsAsObjects(list);
    }

    const cartProductsList = (productsAsObjects, error, status) => {
        if      (status === 'loading')   { return (<p>...Loading</p>); }
        else if (status === 'failed')    { return (<p>{error}</p>); }
        else if (status === 'succeeded') {
            return productsAsObjects.map((product,index) => {
                return <li key ={index}>
                        <div onClick={() => dispatch(removeFromCart({product_id:product.product_id,cartProducts}))}>
                            <img src={product.thumbnail}/>
                        </div>
                       </li>
            })
        }
    }

    return (
        <ul id='shop-cart'>
            <h2>cart</h2>
            {productsAsObjects && cartProductsList(productsAsObjects, error, status)}
        </ul>
    )
    
};
