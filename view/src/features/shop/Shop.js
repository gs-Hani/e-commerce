import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, loadCategories } from './Slice/productsSlice';
import { Product } from './Product';
import './Shop.css';

export const Shop = () => {
    const dispatch = useDispatch();
    const { productsList,
            categories,
            error1,
            error2,
            status1,
            status2, } = useSelector(state => state.products);
    const  [filters, setFilters]                          = useState([]);
    const  [filteredProductsList,setFilteredProductsList] = useState([]);

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadCategories());
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [dispatch]);
    
    useEffect(() => { filter(filters); },[filters.length]);
    
    function changeFilters(category) {

        const sudoFilters = [...filters];

        if(filters.some((filter) => filter === category)) {
            const index  =       sudoFilters.indexOf(category);
            if   (index !== -1) {sudoFilters.splice(index,1)}
        } else {/*------*/sudoFilters.push(category); }

        setFilters       (sudoFilters);
    }

    async function filter(filters) {

        const sudoFilteredProductsList = await productsList.filter((product) => {
            if(filters.some((filter) => filter === product.category)) { return product; }
        });

        setFilteredProductsList (sudoFilteredProductsList);
    }
    
    const categoryList = (categories,error2,status2) => {
        if      (status2 === 'loading') { return (<p>...Loading</p>); }
        else if (status2 === 'failed')  { return (<p>{error2}</p>); }
        else    {
            return  categories.map((category,index) => {
                        return <li key={index} >
                                <label>
                                    <input type="checkbox" name=""/>
                                    <div className="category-box" onClick={() => changeFilters(category.category)}>
                                        <i className="category-text">{category.category}</i>
                                    </div>
                                </label>
                               </li>
                    })
        }
    }
    
    const list = filteredProductsList.length === 0 ? productsList : filteredProductsList;
    
    if        (status1 === 'loading')   { return (<p>...Loading</p>)
    } else if (status1 === 'succeeded') {
        return (
            <div id="shop">
                <ul>
                <h2>categories</h2>
                    {categoryList(categories,error2,status2)}
                </ul>
                <div className="products">
                    {list.map((product) => (
                        <Product key={product.id} product={product}/>
                    ))}
                </div>

            </div>
        )
    } else { { error1 && <span>{error1}</span> } }
};
