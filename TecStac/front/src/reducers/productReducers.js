import { LIST_PRODUCT_REQUEST, LIST_PRODUCT_SUCCESS, LIST_PRODUCT_FAILED, 
    DETAILS_PRODUCT_REQUEST, DETAILS_PRODUCT_SUCCESS, DETAILS_PRODUCT_FAILED, 
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILED 
} from "../constants /constantProducts";

function productListReducer(state = {products: []}, action) {
    switch (action.type) {
        case LIST_PRODUCT_REQUEST: 
            return {loading: true, products: []};
        case LIST_PRODUCT_SUCCESS:
            return {loading: false, products: action.payload};
        case LIST_PRODUCT_FAILED: 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

function productDetailsReducer(state = {product: {}}, action) {
    switch (action.type) {
        case DETAILS_PRODUCT_REQUEST: 
            return {loading: true};
        case DETAILS_PRODUCT_SUCCESS:
            return {loading: false, product: action.payload};
        case DETAILS_PRODUCT_FAILED: 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

function productDeleteReducer(state = {product: {}}, action) {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST: 
            return {loading: true};
        case DELETE_PRODUCT_SUCCESS:
            return {loading: false, product: action.payload, success: true};
        case DELETE_PRODUCT_FAILED: 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

function productSaveReducer(state = {product: {}}, action) {
    switch (action.type) {
        case DETAILS_PRODUCT_REQUEST: 
            return {loading: true};
        case DETAILS_PRODUCT_SUCCESS:
            return {loading: false, success: true, product: action.payload};
        case DETAILS_PRODUCT_FAILED: 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer}