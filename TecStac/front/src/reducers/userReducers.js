import { SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILED, 
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, LOGOUT_USER, 
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED 
} from "../constants /constantUsers";

function userLoginReducer (state={}, action) {
    switch (action.type) {
        case SIGNIN_USER_REQUEST: 
            return {loading: true}; 
        case SIGNIN_USER_SUCCESS: 
            return {loading: false, userInfo: action.payload}; 
        case SIGNIN_USER_FAILED: 
            return {loading: false, error: action.payload}; 
        case LOGOUT_USER:
            return {};
        default: return state; 
    }
}

function userUpdateReducer (state={}, action) {
    switch (action.type) {
        case UPDATE_USER_REQUEST: 
            return {loading: true}; 
        case UPDATE_USER_SUCCESS: 
            return {loading: false, userInfo: action.payload}; 
        case UPDATE_USER_FAILED: 
            return {loading: false, error: action.payload}; 
        default: return state; 
    }
}

function userRegisterReducer (state={}, action) {
    switch (action.type) {
        case REGISTER_USER_REQUEST: 
            return {loading: true}; 
        case REGISTER_USER_SUCCESS: 
            return {loading: false, userInfo: action.payload}; 
        case REGISTER_USER_FAILED: 
            return {loading: false, error: action.payload}; 
        default: return state; 
    }
}

export {userLoginReducer, userRegisterReducer, userUpdateReducer}