import React from 'react';

import shoppingKart from '../../util/icons/shopping_cart_FILL0_wght400_GRAD0_opsz48.svg'

export const Product = (data) => {
    const {product} = data;
    return (
        <div className="productCard">
            <img className="productImage" src={`${process.env.PUBLIC_URL}${product.thumbnail}`} alt={product.name}/>
            <h3>{product.name}</h3>
            <div className="productCard-footer">
                <span>{product.price}$</span>
                <button className='kartButton'>
                    <img className="kartImage" src={shoppingKart}/>
                </button>
            </div>
        </div>
    );
};