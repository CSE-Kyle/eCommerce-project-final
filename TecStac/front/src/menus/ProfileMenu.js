import {logout, update} from '../actions/userActions';
import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';

function ProfileMenu(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin; 
    const logoutHandle = () => {
        dispatch(logout());
        props.history.push("/login");
    }

    const submitHandler = (e) => {
        e.preventDefault(); 
        dispatch(update({userId: userInfo._id, email, name, password}));
    }

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading, success, error} = userUpdate;

    const myListOrder = useSelector(state => state.myListOrder); 
    const {loading: ordersLoading, orders, error: ordersError} = myListOrder;

    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }
        dispatch(listMyOrders());
        return () => {
        }; 
    }, [])

    return <div className="profile">
        <div className="info-profile">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="container-form">
                        <li>
                            <h2>Account</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                            {success && <div>Profile Saved</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                        </li>
                        <li>
                            <button type="button" onClick={logoutHandle} className="button secondary full-width">Logout</button>
                        </li>
                    </ul>
                </form>
            </div>  
        </div>
        <div className="orders-profile content-margined">
            {
                ordersLoading ? <div>Loading...</div> :
                ordersError ? <div>{ordersError}</div> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>PRICE</th>
                            <th>PAID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid}</td>
                            <td>
                                <Link to={"/order/" + order._id}>INFORMATION</Link>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            }
        </div>
    </div>
}

export default ProfileMenu;