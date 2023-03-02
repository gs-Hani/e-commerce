import   React         from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Cart }        from '../cart/Cart';
import { CartButton }  from '../../components/cartButton/cartButton';

import './DetailedProduct.css';

export const DetailedProduct = () => {
    const   location = useLocation();
    const { id }     = location.state;
    const   product  = useSelector(state => state.products.productsList.find(product => product.product_id === id))

    return (
        <div id="detailedProductCard">
            <div className='detailedProduct'>
                <img className="productImage" src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name}/>
                <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="productCard-footer">
                        <span>{`${product.price} $`}</span>
                        <CartButton product={product}/>
                    </div> 
                </div>
            </div>
            <Cart/>
        </div>
    )
};