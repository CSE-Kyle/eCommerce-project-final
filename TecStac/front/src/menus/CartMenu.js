import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../actions/cartActions';

function CartMenu(props) {
    const cart = useSelector(state => state.cart); 
    const {cartItems} = cart;
    const productId = props.match.params.id; 
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeItemFromCartHandler = (productId) => {
        dispatch(removeItemFromCart(productId));
    } 
    useEffect(() => {
        if(productId) {
            dispatch(addItemToCart(productId, qty)); 
        }
    }, []);

    const checkoutHandler = () => {
        props.history.push("/login?redirect=shipping");
    }
    return <div className="cart">
        <div className="list-cart">
            <ul className="cart-list-container">
                <li>
                    <h3>Cart</h3>
                    <div>Price</div>
                </li>
                {
                    cartItems.length === 0 ?  
                    <div>
                        Cart empty
                    </div>
                    : 
                    cartItems.map(item => 
                        <li>
                            <div className="image-cart">
                                <img src={item.image} alt="product"/>
                            </div>
                            <div className="name-cart">
                                <div>
                                    <Link to={"/product/" + item.product}>{item.name}</Link>
                                </div>
                                <div>
                                    Qty:
                                    <select value={item.qty} onChange={(e) => dispatch(addItemToCart(item.product, e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                    <button type="button" className="button" onClick={() => removeItemFromCartHandler(item.product)}>Remove</button>
                                </div>
                            </div>
                            <div className="price-cart">
                                ${item.price}
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
        <div className="action-cart">
            <h3>
                Total ({cartItems.reduce((a, c) => a + c.qty, 0)})
                : 
                $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                Checkout
            </button>
        </div>
    </div>
}

export default CartMenu;