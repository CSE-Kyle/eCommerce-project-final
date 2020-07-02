import React from 'react';
import './App.css';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import ProductMenu from './menus/ProductMenu';
import HomeMenu from './menus/HomeMenu';
import CartMenu from './menus/CartMenu';
import LoginMenu from './menus/LoginMenu';
import { useSelector } from 'react-redux';
import RegisterMenu from './menus/RegisterMenu';
import ProductsMenu from './menus/ProductsMenu';
import ShippingMenu from './menus/ShippingMenu';
import PaymentMenu from './menus/PaymentMenu';
import PlaceOrderMenu from './menus/PlaceOrderMenu';
import OrderMenu from './menus/OrderMenu';
import OrdersMenu from './menus/OrdersMenu';
import ProfileMenu from './menus/ProfileMenu';

function App() {
  const userLogin = useSelector(state => state.userLogin); 
  const {userInfo} = userLogin;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <Link to="/">TecStac</Link>
          </div>
          <div className="link-headers">
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
              <Link to="/login">Login</Link>
            }
            <Link to="/cart">Cart</Link>
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        
        <main className="main">
          <div className="web-content">
            <Route path="/profile" component={ProfileMenu}/>
            <Route path="/orders" component={OrdersMenu}/>
            <Route path="/order/:id" component={OrderMenu}/>
            <Route path="/products" component={ProductsMenu}/>
            <Route path="/shipping" component={ShippingMenu}/>
            <Route path="/payment" component={PaymentMenu}/>
            <Route path="/placeorder" component={PlaceOrderMenu}/>
            <Route path="/login" component={LoginMenu}/>
            <Route path="/register" component={RegisterMenu}/>
            <Route path="/product/:id" component={ProductMenu}/>
            <Route path="/cart/:id?" component={CartMenu}/>
            <Route path="/category/:id?" component={HomeMenu}/>
            <Route path="/" exact={true} component={HomeMenu}/> 
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
