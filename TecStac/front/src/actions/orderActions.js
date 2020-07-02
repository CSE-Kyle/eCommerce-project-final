import Axios from "axios";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, 
    DETAILS_ORDER_REQUEST, DETAILS_ORDER_SUCCESS, DETAILS_ORDER_FAILED, 
    PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS, PAY_ORDER_FAILED, 
    LIST_ORDER_REQUEST, LIST_ORDER_SUCCESS, LIST_ORDER_FAILED, 
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILED, 
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAILED 
} from "../constants /orderConstants";

const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST, payload: order});
        const {userLogin: {userInfo}} = getState();
        const {data: {data: newOrder}} = await Axios.post("/api/orders", order, {
            headers: {
                Authorization: ' Bearer ' + userInfo.token
            }
        });
        dispatch({type: CREATE_ORDER_SUCCESS, payload: newOrder}); 
    } catch (error) {
        dispatch({type: CREATE_ORDER_FAILED, payload: error.message}); 
    }
}

const listMyOrders = () => async(dispatch, getState) => {
    try {
        dispatch({type: MY_ORDER_LIST_REQUEST}); 
        const {userLogin: {userInfo}} = getState();
        const {data} = await Axios.get("/api/orders/mine", {
            headers: 
                {Authorization: 'Bearer ' + userInfo.token}
        });
        dispatch({type: MY_ORDER_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: MY_ORDER_LIST_FAILED, payload: error.message });
    }
}

const listOrders = () => async(dispatch, getState) => {
    try {
        dispatch({type: LIST_ORDER_REQUEST}); 
        const {userLogin: {userInfo}} = getState();
        const {data} = await Axios.get("/api/orders", {
            headers: 
                {Authorization: 'Bearer ' + userInfo.token}
        });
        dispatch({type: LIST_ORDER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: LIST_ORDER_FAILED, payload: error.message });
    }
}

const detailsOrder = (orderId) => async(dispatch, getState) => {
    try {
        dispatch({type: DETAILS_ORDER_REQUEST, payload: orderId});
        const {userLogin: {userInfo}} = getState();
        const {data} = await Axios.get("/api/orders/" + orderId, {
            headers:
                {Authorization: 'Bearer ' + userInfo.token}
        });
        dispatch({type: DETAILS_ORDER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: DETAILS_ORDER_FAILED, payload: error.message}); 
    }  
}

const payOrder = (order, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({type: PAY_ORDER_REQUEST, payload: paymentResult});
        const {userLogin: {userInfo}} = getState();
        const {data} = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
            headers:
                {Authorization: 'Bearer ' + userInfo.token}
        });
        dispatch({type: PAY_ORDER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PAY_ORDER_FAILED, payload: error.message}); 
    }  
}

const deleteOrder = (orderId) => async(dispatch, getState) => {
    try {
        dispatch({type: DELETE_ORDER_REQUEST, payload: orderId});
        const {userLogin: {userInfo}} = getState();
        const {data} = await Axios.delete("/api/orders/" + orderId, {
            headers:
                {Authorization: 'Bearer ' + userInfo.token}
        });
        dispatch({type: DELETE_ORDER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: DELETE_ORDER_FAILED, payload: error.message}); 
    }  
}

export {createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder};