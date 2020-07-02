import React, { useEffect, useLayoutEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';

function OrderMenu(props) {

    const orderPay = useSelector(state => state.orderPay); 
    const {loading: loadingPay, success: successPay, error: errorPay} = orderPay;
    const dispatch = useDispatch();
    useEffect (() => {
        if (successPay) {
            props.history.push("/profile"); 
        } else {
            dispatch(detailsOrder(props.match.params.id)); 
        }
        return () => {
        };
    }, [successPay]);

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }
    const orderDetails = useSelector(state => state.orderDetails);
    const {loading, order, error} = orderDetails;
    const payHandler = () => {};

    return loading ? <div>Loading...</div> : error ? <div>{error}</div> :

        <div>
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>Shipping :</h3>

                        <div>
                            {order.shipping.address} {order.shipping.city},{' '}
                            {order.shipping.state} {order.shipping.postalCode},{' '}
                            {order.shipping.country}
                        </div>

                        <div>
                            {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
                        </div>
                    </div>

                    <div>
                        <h3>Payment :</h3>
                        <div>
                            Payment Method: {order.payment.paymentMethod}
                        </div>
                        <div>
                            {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
                        </div>
                    </div>

                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h3>Cart</h3>
                                <div>Price</div>
                            </li>

                            {
                                order.orderItems.length === 0 ?  
                                <div>
                                    Cart empty
                                </div>
                                : 
                                order.orderItems.map(item => 
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
                        <li className="placeorder-actions-payment">
                            {!order.isPaid && 
                                <PaypalButton 
                                    amount={order.totalPrice} 
                                    onSuccess={handleSuccessPayment}
                                />
                            }
                        </li>
                        <li>
                            <h3>Summary of Order</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${order.itemsPrice}</div>
                        </li>
                        <li>
                            <div>Total</div>
                            <div>${order.totalPrice}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
}

export default OrderMenu;