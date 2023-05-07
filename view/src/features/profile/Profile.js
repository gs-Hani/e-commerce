import   React, { useEffect,useState }      from 'react';
import          { useSelector,useDispatch } from 'react-redux';
import          { useNavigate }             from 'react-router-dom';


import          { update_data }                from '../registration/Slice/authSlice';
import          { maxBirthDate,matchPassword } from '../../util/usefulFunctions';

import './Profile.css';

export const Profile = () => {
    const [username   , setUsername]    = useState();
    const [email      , setEmail   ]    = useState();   
    const [password   , setPassword]    = useState();
    const [newPassword, setNewPassword] = useState();
    const [date       , setDate    ]    = useState();
    const  navigate               = useNavigate();
    const  dispatch               = useDispatch();
    const  profile                = useSelector(state => state.auth);

    useEffect(() => { if(!profile.authenticated) {navigate('/');} },  [profile.authenticated]);
    useEffect(() => console.log() ,[profile.status]);

    const updateAccount = async (username,email,password,newPassword,date) => {
        let UN; let E; let NP; let D;
        !username    ? UN = profile.user_name     : UN = username;
        !email       ? E  = profile.email         : E  = email;
        !newPassword ? NP = password              : NP = newPassword;
        !date        ? D  = profile.date_of_birth : D  = date;
        dispatch(update_data({  user_id:      profile.user_id, 
                                user_name:    UN,
                                oldEmail :    profile.email, 
                                email:        E, 
                                oldPassword:  password, 
                                password:     NP, 
                                date_of_birth:D
                        }));
        };
    if      (profile.status === 'loading') { return (<p>...Loading</p>) }
    else if (profile.status === 'succeeded') {
        return (
                <div id="profileCard">
                    <h2>Profile</h2>
                    <form id = "profile-form"
                          onSubmit ={(e) => { e.preventDefault(); 
                                              updateAccount(username,email,password,newPassword,date);
                                              document.getElementById("profile-form").reset();
                                        }}
                    >
                        <input  type        ="text"
                                id          ="name"
                                name        ="name"
                                placeholder ={profile.user_name} 
                                minLength   ="2" 
                                maxLength   ="16"
                                autoComplete="off"
                                onChange    ={(e) => setUsername(e.target.value)} 
                                />
                        <input  type        ="email"
                                id          ="email"
                                name        ="email"
                                placeholder ={profile.email}
                                size        ="25"
                                autoComplete="off"
                                onChange    ={(e) => setEmail(e.target.value)} 
                                />
                        <div id='dates'>
                                <input  type    ="text"
                                        id      ="Odate"
                                        name    ="date" 
                                        placeholder={profile.date_of_birth}
                                        disabled
                                        />
                                <input  type    ="date"
                                        id      ="Ndate"
                                        name    ="date"
                                        max     ={maxBirthDate()}
                                        onChange={(e) => setDate(e.target.value)}
                                        />
                        </div>
                        <div id='passwords'>
                                <input  type        ="password"
                                        id          ="password"
                                        name        ="new password"
                                        placeholder ="I would like to change my password"
                                        autoComplete="off"
                                        onChange    ={(e) => {matchPassword(e.target.value);setNewPassword(e.target.value);}}
                                        />
                                <input  type        ="password"
                                        id          ="confirm-password"
                                        //   name        ="confirm new password" --------------------> this input won't be submitted
                                        placeholder ="confirm new password"
                                        autoComplete="off"
                                        onChange    ={(e) => {matchPassword(e.target.value);}}
                                        />
                        </div>
                        <input  type        ="password"
                                id          ="old password"
                                name        ="password"
                                placeholder ="Enter current password to confirm the update"
                                minLength   ="8" 
                                maxLength   ="32"
                                autoComplete="off"
                                onChange    ={(e) => {setPassword(e.target.value);}}
                                required 
                                />
                        <input  type     ="submit"
                                id       ="submit"
                                value    ="Submit"
                                />
                    </form>
                </div>
        )
    } else { { profile.error && <span>{profile.error}</span> } }
    
}