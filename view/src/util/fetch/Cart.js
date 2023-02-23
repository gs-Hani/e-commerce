const { API_ENDPOINT } = require ("../apiEndpoint");

const fetchCart = async (cart_id) => {
    const  res = await fetch(`${API_ENDPOINT}/cart/${cart_id}`,{ 
        method:'GET',
        body:   null,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const  json = await res.json();
    return json;
};
const addItem = async (product_id) => {
    try { const  res = await fetch(`/${product_id}`,{ method:'POST' });
          return res.json();
    } catch (error) { return { error }; }
};
const removeItem = async (cart_id, product_id) => {
    try { const  res = await fetch(`/${cart_id}/${product_id}`,{ method:'DELETE' });
          return res.json();
    } catch (error) { return { error }; }
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

module.exports = { fetchCart, addItem, removeItem, updateItem, checkout }; //=============