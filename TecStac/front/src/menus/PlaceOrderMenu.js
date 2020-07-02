import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

function PlaceOrderMenu(props) {
    const cart = useSelector(state => state.cart); 
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const {cartItems, shipping, payment} = cart;
    if (!shipping.address) {
        props.history.push("/shipping");
    } else if (!payment.paymentMethod) {
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const totalPrice = itemsPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, totalPrice
        }));
    }

    useEffect(() => {
        if (success) {
            props.history.push("/order/" + order._id);
        }
    }, [success]);

    const checkoutHandler = () => {
        props.history.push("/login?redirect=shipping");
    }

    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>Shipping :</h3>

                    <div>
                        {cart.shipping.address} {cart.shipping.city},{' '}
                        {cart.shipping.state} {cart.shipping.postalCode},{' '}
                        {cart.shipping.country}
                    </div>
                </div>

                <div>
                    <h3>Payment :</h3>
                    <div>Payment Method: {cart.payment.paymentMethod}</div>
                </div>

                <div>
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
                                            Qty: {item.qty}
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
            </div>

            <div className="placeorder-action">
                <ul>
                    <li>
                        <button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button>
                    </li>
                    <li>
                        <h3>Summary of Order</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${itemsPrice}</div>
                    </li>
                    <li>
                        <div>Total</div>
                        <div>${totalPrice}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default PlaceOrderMenu;