import   React, { useEffect }      from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation }             from 'react-router-dom';

import { Cart }         from '../cart/Cart';
import { CartButton }   from '../../components/cartButton/cartButton';
import { loadProducts } from '../shop/Slice/productsSlice';

import './DetailedProduct.css';

export const DetailedProduct = () => {
    const   dispatch = useDispatch();
    const   location = useLocation();
    const { id }     = location.state;
    const { productsList,
            error1,
            status1, }   = useSelector(state => state.products);
    const   product      = productsList.find(product => product.product_id === id);
    useEffect(() => {dispatch(loadProducts());}, [dispatch,location]);
    
    if        (status1 === 'loading') { return (<p>...Loading</p>)
    } else if (status1 === 'succeeded') {
        return (
            <div id="detailedProductCard">
                <div className='detailedProduct'>
                    <img className="productImage" src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name}/>
                    <div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="productCard-footer">
                            <span>{`${product.price} $`}</span>
                            <CartButton product_id={product.product_id}/>
                        </div> 
                    </div>
                </div>
                <Cart/>
            </div>
        )
    } else { { error1 && <span>{error1}</span> } } 
};
