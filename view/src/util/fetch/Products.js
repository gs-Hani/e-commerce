const { API_ENDPOINT } = require ("../apiEndpoint");

const fetchProducts = async () => {
    const response = await fetch(`${API_ENDPOINT}/shop/products`,{
        method:'GET',
        body: null,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const json = await response.json();
    return json;
}; 

const productById = async (product_id) => {
    try { const  res = await fetch(`/shop/products/${product_id}`,{ method:'GET' });
          return res.json();
    } catch (error) { return { error }; }
};

const fetchCategories = async () => {
    const response = await fetch(`${API_ENDPOINT}/shop/categories`,{
        method:'GET',
        body: null,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const  json = await response.json();
    return json;
};

module.exports = { fetchProducts, productById, fetchCategories }; //======================