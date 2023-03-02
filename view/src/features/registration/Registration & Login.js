import   React, { useEffect, useState }      from 'react';
import          { useDispatch, useSelector } from 'react-redux';
import          { useNavigate }              from 'react-router-dom';
import './Registration & Login.css';

import { sign_up, sign_in } from './Slice/authSlice';

export const RegisterOrLogin = () => {
       const [username, setUsername] = useState();
       const [email   , setEmail]    = useState();   
       const [password, setPassword] = useState();
       const [date    , setDate]     = useState();
       const  navigate               = useNavigate();
       const  dispatch               = useDispatch();
       const { authenticated }       = useSelector(state => state.auth);
       const { error }               = useSelector(state => state.auth);
       useEffect(() => {
         if(authenticated) {navigate('/');}
       },  [authenticated]);
       // make minimum age required 18 years =========================================================
       const birthDay = new Date();
             birthDay.setFullYear( birthDay.getFullYear() - 18 );
       const newDate = birthDay.toLocaleString('en-GB', { timeZone: 'UTC' }).split(",");
       const maxBirthDate = newDate[0].split("/").reverse().join("-");

       // validate password ==========================================================================
       const matchPassword = (password1) => {  
              const password2 = document.getElementById("password").value;
              const password3 = document.getElementById("confirm-password").value;
              if   (password1 === password2 && password1 === password3) { 
                     document.getElementById("submit").disabled = false;
                     document.getElementById("submit").value    = "Register";
              } else { 
                     document.getElementById("submit").disabled = true;
                     document.getElementById("submit").value    = "passwords don't match";
              }  
       } 
       // registration response ==========================================================================
       const register = async  (username,email,password,date) => {
              dispatch(sign_up({username,email,password,date}));
       };
       // login response =================================================================================
       const login/*-------*/= (email,password) => {
              dispatch(sign_in({email,password}));
       };
       // slide ==========================================================================================
       const slide = () => {
              document.getElementById("sign-in-form").style.bottom = "0";
       };
       // facebook response ==============================================================================
       // const facebook/*----*/= async () => {
       //        facebookLogin();
              // const res/*--*/= await facebookLogin();
              // console.log(res);
              // const response = await res.json();
              // if(response.type === "error") {
              //        document.getElementById("message").innerHTML = response.message;     
              // } else {
              //        console.log(response);
              //        navigate('/home');
              // }
       // };
    return (
       <div className="registration_login">
            <form id ="sign-up-form"
                  onSubmit ={(e) => { e.preventDefault(); register(username,email,password,date);}}
              >
              <h2>Sign UP</h2>
              <input type        ="text"
                     id          ="name"
                     name        ="name"
                     placeholder ="username (2-16) letters" 
                     minLength   ="2" 
                     maxLength   ="16"
                     autoComplete="on" 
                     onChange={(e) => setUsername(e.target.value)}
                     required />

              <input type        ="email"
                     id          ="email"
                     name        ="email"
                     placeholder ="example@emailprovider.com"
                     onChange    ={(e) => setEmail(e.target.value)}
                     size        ="25"
                     autoComplete="on"
                     required />

              <input type        ="password"
                     id          ="password"
                     name        ="password"
                     placeholder ="password"
                     onChange    ={(e) => {matchPassword(e.target.value); setPassword(e.target.value);}}
                     minLength   ="8" 
                     maxLength   ="32"
                     autoComplete="off" 
                     required />

              <input type        ="password"
                     id          ="confirm-password"
                     //   name        ="confirm-password" --------------------> this input won't be submitted
                     placeholder ="confirm-password"
                     onChange    ={(e) => matchPassword(e.currentTarget.value)}
                     autoComplete="off"
                     required />

              <input type    ="date"
                     id      ="date"
                     name    ="date" 
                     max     ={maxBirthDate}
                     onChange={(e) => setDate(e.target.value)}
                     required />

              <input type     ="submit"
                     id       ="submit"
                     value    ="Register"
              />
            </form>
            {/*========================================================================================*/}
            <form id ="sign-in-form"
                  onSubmit ={(e) => {e.preventDefault(); login(email,password);}}
              >
              <h2>Sign IN</h2>
              <input type        ="email"
                     id          ="Email"
                     name        ="email"
                     placeholder ="example@emailprovider.com"
                     onChange    ={(e) =>  setEmail(e.target.value)}
                     size        ="25"
                     autoComplete="on"
                     required />

              <input type        ="password"
                     id          ="Password"
                     name        ="password"
                     placeholder ="password"
                     onChange    ={(e) => setPassword(e.target.value)}
                     minLength   ="8" 
                     maxLength   ="32"
                     autoComplete="off" 
                     required />

              <input type     ="submit"
                     id       ="Submit"
                     value    ="Log in"
              />

              <button type    ="button"
                      id      ="slide"
                      onClick ={() => slide()}>
                      no account?
              </button>
               
            </form>
            {/* <div>
              <button type="button" onClick={() => facebook()}>Continue with Facebook</button>
              <button type="button" href="/auth/google"  >Continue with Google</button>
            </div> */}
              {
                error && <span>{error}</span>
              }
       </div>
    );
};