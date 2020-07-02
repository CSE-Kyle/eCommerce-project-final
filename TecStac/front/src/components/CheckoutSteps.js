import React from 'react'; 

function CheckoutSteps(props) {
    return <div className="steps-checkout">
        <div className={props.step1 ? 'active' : ''}>Login</div>
        <div className={props.step2 ? 'active' : ''}>Shipping</div>
        <div className={props.step3 ? 'active' : ''}>Payment</div>
        <div className={props.step4 ? 'active' : ''}>Order</div>
    </div>
}

export default CheckoutSteps;