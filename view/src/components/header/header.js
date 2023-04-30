import   React,     { useEffect }   from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link }                     from 'react-router-dom';
import { sign_out,is_Auth }         from '../../features/registration/Slice/authSlice';
import './header.css';

import account  from '../../util/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg';
import checkout from '../../util/icons/shopping_cart_checkout_FILL0_wght400_GRAD0_opsz48.svg'
import home     from '../../util/icons/home_FILL0_wght400_GRAD0_opsz48.svg';
import login    from '../../util/icons/login_FILL0_wght400_GRAD0_opsz48.svg';
import logout   from '../../util/icons/logout_FILL0_wght400_GRAD0_opsz48.svg';
import orders   from '../../util/icons/receipt_long_FILL0_wght400_GRAD0_opsz48.svg';

export const Header = () => {

  const dispatch = useDispatch();

  useEffect (() => { dispatch(is_Auth()); },[dispatch]);

  const icons = [{n:"orders",  i:orders,  e:null},
                 {n:"checkout",i:checkout,e:null},
                 {n:"account", i:account, e:null}];

  const user = useSelector(state => state.auth);

  return  <div id="header">
            <h1>Desert Forge</h1>
            <ul id='nav'>
              <li >
                {user.authenticated 
                  ? <img src={logout} alt={"logout"} onClick={() => dispatch(sign_out(user))}/>
                  : <Link to='/auth'><img src={login}  alt={`go to login page`}/></Link>}
              </li>
              {icons.map((icon,index) => {
                if (user.authenticated) {
                  return <li key={index}>
                            <Link to={icon.e} className="nav-box"><img src={icon.i} alt={`go to ${icon.n} page`}/></Link> 
                        </li> 
                }})}
                <li key='3'>
                  <Link to='/' className="nav-box"><img src={home} alt={`go to home page`}/></Link> 
                </li>
            </ul>
          </div>        
};