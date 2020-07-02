import Cookie from 'js-cookie';
import Axios from 'axios';
import { SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILED, 
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, LOGOUT_USER, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED 
} from '../constants /constantUsers';

const update = ({userId, name, email, password}) => async (dispatch, getState) => {
    const {userLogin: userInfo} = getState();
    dispatch ({type: UPDATE_USER_REQUEST, payload: {userId, name, email, password}}); 
    try {
        const {data} = await Axios.put("/api/users/" + userId, {name, email, password}, { 
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        }); 
        dispatch ({type: UPDATE_USER_SUCCESS, payload: data}); 
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch ({type: UPDATE_USER_FAILED, payload: error.message}); 
    }
}

const login = (email, password) => async (dispatch) => {
    dispatch ({type: SIGNIN_USER_REQUEST, payload: {email, password}}); 
    try {
        const {data} = await Axios.post("/api/users/login", {email, password}); 
        dispatch ({type: SIGNIN_USER_SUCCESS, payload: data}); 
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch ({type: SIGNIN_USER_FAILED, payload: error.message}); 
    }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch ({type: REGISTER_USER_REQUEST, payload: {name, email, password}}); 
    try {
        const {data} = await Axios.post("/api/users/register", {name, email, password}); 
        dispatch ({type: REGISTER_USER_SUCCESS, payload: data}); 
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch ({type: REGISTER_USER_FAILED, payload: error.message}); 
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo"); 
    dispatch({type: LOGOUT_USER});
}

export {login, register, logout, update};