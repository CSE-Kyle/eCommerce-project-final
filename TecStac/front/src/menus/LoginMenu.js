import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { login } from '../actions/userActions';

function LoginMenu (props) {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const userLogin = useSelector(state => state.userLogin); 
    const {loading, userInfo, error} = userLogin; 
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault(); 
        dispatch(login(email, password)); 
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="container-form">
                <li>
                    <h2>Login</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Login</button>
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center">Create an Account</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default LoginMenu;