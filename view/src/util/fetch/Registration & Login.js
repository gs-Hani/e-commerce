const { API_ENDPOINT } = require ("../apiEndpoint");

const authPage = async () => {
    try { const  res = await fetch('/auth',{ method:'GET' });
          return res.json();
    } catch (error) { return { error }; }
};

const signUp = async(username,email,password,date) => {
    const response = await fetch(`${API_ENDPOINT}/auth/sign_up`, { 
        method:'POST',
        body  : JSON.stringify({
                user_name:     username,
                email:         email,
                password:      password,
                date_of_birth: date
        }),
        headers: {
            "Content-Type": "application/json"
        } });
    const  json = await response.json();
    return json;
};

const signIn = async (email,password) => {
    const response = await fetch(`${API_ENDPOINT}/auth/sign_in`,{
        method:'POST', 
        body  : JSON.stringify({
                username: email,
                password: password,    
        }),
        headers: {
            "Content-Type": "application/json"
        } });
    const  json = await response.json();
    return json;
};

// const facebookLogin = async () => {
//     const  response = await fetch(`${API_ENDPOINT}/auth/facebook`, { 
//         method:'GET',
//         headers: {
//             "Content-Type": "application/json"
//         } });
//     return response;
// };

const signOut = async (user) => {
    const res = await fetch(`${API_ENDPOINT}/auth/sign_out`,{ 
        method:'POST',
        body:  JSON.stringify({...user}),
        headers: {
            "Content-Type": "application/json"
            } });
    const  json = await res.json();
    return json;
};

module.exports = { authPage, signUp, signIn, signOut }; //====================================