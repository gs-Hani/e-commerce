import   React         from 'react';
import { Link }        from 'react-router-dom';

import { CartButton }  from '../../components/cartButton/cartButton';

export const Product = (data) => {
    const {product}  =  data;
    return (
        <div  className="productCard">
            <Link to   ={`/${product.product_id}`} 
                  state={{ id: product.product_id }}>
                <img className="productImage" src={`${process.env.PUBLIC_URL}${product.thumbnail}`} alt={product.name}/>
            </Link>
            <h3>{product.name}</h3>
            <div className="productCard-footer">
                <span>{product.price} $</span>
                <CartButton product_id={product.product_id}/>
            </div>
        </div>
    );
};