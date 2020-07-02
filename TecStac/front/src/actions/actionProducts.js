import { LIST_PRODUCT_REQUEST, LIST_PRODUCT_SUCCESS, LIST_PRODUCT_FAILED, 
    DETAILS_PRODUCT_REQUEST, DETAILS_PRODUCT_SUCCESS, DETAILS_PRODUCT_FAILED, 
    SAVE_PRODUCT_REQUEST, SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILED, 
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILED 
} from "../constants /constantProducts";
import axios from "axios";
import Axios from "axios";

const listProducts = (category = '', keywordSearch = '', orderSort = '') => async(dispatch) => {
    try {
        dispatch ({type: LIST_PRODUCT_REQUEST});
        const {data} = await axios.get("/api/products?category=" + category + "&keywordSearch=" + keywordSearch + "&orderSort" + orderSort); 
        dispatch ({type: LIST_PRODUCT_SUCCESS, payload: data});
    } catch(error) {
        dispatch ({type: LIST_PRODUCT_FAILED, payload: error.message});
    }
}

const saveProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({type: SAVE_PRODUCT_REQUEST, payload: product});
        const {userLogin: {userInfo}} = getState();
        if (!product._id) {
            const {data} = await Axios.post('/api/products', product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({type: SAVE_PRODUCT_SUCCESS, payload: data});
        } else {
            const {data} = await Axios.put('/api/products/' + product._id, product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({type: SAVE_PRODUCT_SUCCESS, payload: data});
        }
      
    } catch (error) {
        dispatch({type: SAVE_PRODUCT_FAILED, payload: error.message});
    }
}

const detailsProduct = (productId) => async(dispatch) => {
    try {
        dispatch ({type: DETAILS_PRODUCT_REQUEST, payload: productId});
        const {data} = await axios.get("/api/products/" + productId);
        dispatch ({type: DETAILS_PRODUCT_SUCCESS, payload: data});
    } catch (error) {
        dispatch ({type: DETAILS_PRODUCT_FAILED, payload: error.message}); 
    }
}

const deleteProduct = (productId) => async(dispatch, getState) => {
    try {
        const {userLogin: {userInfo}} = getState();
        dispatch ({type: DELETE_PRODUCT_REQUEST, payload: productId});
        const {data} = await axios.delete("/api/products/" + productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch ({type: DELETE_PRODUCT_SUCCESS, payload: data, success: true});
    } catch (error) {
        dispatch ({type: DELETE_PRODUCT_FAILED, payload: error.message}); 
    }
}

export {listProducts, detailsProduct, saveProduct, deleteProduct}
