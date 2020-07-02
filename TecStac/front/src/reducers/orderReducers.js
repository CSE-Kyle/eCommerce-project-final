import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, 
    DETAILS_ORDER_REQUEST, DETAILS_ORDER_SUCCESS, DETAILS_ORDER_FAILED, 
    PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS, PAY_ORDER_FAILED, 
    LIST_ORDER_REQUEST, LIST_ORDER_SUCCESS, LIST_ORDER_FAILED, 
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILED, 
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAILED 
} from "../constants /orderConstants";

function orderCreateReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {loading: true};
        case CREATE_ORDER_SUCCESS:
            return {loading: false, order: action.payload, success: true};
        case CREATE_ORDER_FAILED:
            return {loading: false, error: action.payload};
        default: return state;
    }
}

function orderDetailsReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch (action.type) {
        case DETAILS_ORDER_REQUEST:
            return {loading: true};
        case DETAILS_ORDER_SUCCESS:
            return {loading: false, order: action.payload};
        case DETAILS_ORDER_FAILED:
            return {loading: false, error: action.payload};
        default: return state;
    }
}

function myListOrderReducer(state = {
    orders: []
}, action) {
    switch (action.type) {
        case MY_ORDER_LIST_REQUEST:
            return {loading: true};
        case MY_ORDER_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case MY_ORDER_LIST_FAILED: 
            return {loading: false, error: action.payload};
        default: return state;
    }
}

function orderListReducer(state = {
    orders: []
}, action) {
    switch (action.type) {
        case LIST_ORDER_REQUEST:
            return {loading: true};
        case LIST_ORDER_SUCCESS:
            return {loading: false, orders: action.payload};
        case LIST_ORDER_FAILED: 
            return {loading: false, error: action.payload};
        default: return state;
    }
}

function orderPayReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch (action.type) {
        case PAY_ORDER_REQUEST:
            return {loading: true};
        case PAY_ORDER_SUCCESS:
            return {loading: false, success: true};
        case PAY_ORDER_FAILED:
            return {loading: false, error: action.payload};
        default: return state;
    }
}

function orderDeleteReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
            return {loading: true};
        case DELETE_ORDER_SUCCESS:
            return {loading: false, success: true};
        case DELETE_ORDER_FAILED:
            return {loading: false, error: action.payload};
        default: return state;
    }
}

export {orderCreateReducer, orderDetailsReducer, orderPayReducer, 
    myListOrderReducer, orderListReducer, orderDeleteReducer
}