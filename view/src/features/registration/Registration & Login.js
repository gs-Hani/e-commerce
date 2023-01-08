import React, { useState } from 'react';
import './Registration & Login.css';

import { signUp } from '../../util/fetch/Registration & Login';

export const Registration = () => {
       const [username, setUsername] = useState();
       const [email   , setEmail]    = useState();   
       const [password, setPassword] = useState();
       const [date    , setDate]     = useState();

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
       // response ===================================================================================
       const register/*----*/= async/*---*/(username,email,password,date) => {
              const res/*--*/= await signUp(username,email,password,date);
              const response = await res.json();
              console.log(response);
              document.getElementById("message").innerHTML = response.message;
       };

    return (
       <div className="registration&login">
            <h1>Hello to the registration & login page !!</h1>
            <form id       ="sign-up form"
              //     action   ="/placeholder"
              //     method   ="post"
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
                     onChange    ={(e) =>  setEmail(e.target.value)}
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
              <span id = "message" ></span> 
            </form>
            <form>
              <h2>Sign IN</h2>
              <input type        ="email"
                     id          ="Email"
                     name        ="email"
                     placeholder ="example@emailprovider.com"
                     size        ="25"
                     autoComplete="off"
                     required />

              <input type        ="password"
                     id          ="Password"
                     name        ="password"
                     placeholder ="password"
                     minLength   ="8" 
                     maxLength   ="32"
                     autoComplete="off" 
                     required />

              <input type     ="submit"
                     id       ="Submit"
                     value    ="Log in"
              />       
            </form>
       </div>
    );
};