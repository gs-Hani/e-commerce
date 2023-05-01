// const { API_ENDPOINT } = require ("../apiEndpoint");

const fetchCart = async (cart_id) => {
    const  res = await fetch(`/cart/${cart_id}`,{ 
        method     :'GET',
        credentials:'include',
        body       : null,
        headers    :{
            "Content-Type": "application/json"
        }
    });
    const  json = await res.json();
    return json;
};
const fetchSessionCart = async () => {
    const res = await fetch('/cart/session', {
        method :'GET',
        body   : null,
        headers:{
            "Content-Type": "application/json"
        }
    });
    const  json = await res.json();
    return json;
};
const addItem = async (product_id) => {
    const res = await fetch(`/cart/addItem`,{
        method :'POST',
        body   : JSON.stringify([`${product_id}`]),
        headers:{
            "Content-Type": "application/json"
        }
    });
    const  json = await res.json();
    return json;
};
const removeItem = async (product_id) => {
    const  res = await fetch(`/cart/removeItem`,{ 
        method :'DELETE',
        body   : JSON.stringify([`${product_id}`]),
        headers:{
            "Content-Type": "application/json"
        }
    });
    const  json = await res.json();
    return json;
};
const updateItem = async (cart_id, product_id) => {
    try { const  res = await fetch(`/${cart_id}/${product_id}`,{ method:'PUT' });
          return res.json();
    } catch (error) { return { error }; }
};
const checkout = async (cart_id) => {
    try { const  res = await fetch(`/${cart_id}/checkout`,{ method:'POST' });
          return res.json();
    } catch (error) { return { error }; }
};

module.exports = { fetchCart, 
                   fetchSessionCart,  
                   addItem, 
                   removeItem, 
                   updateItem, 
                   checkout }; //=============