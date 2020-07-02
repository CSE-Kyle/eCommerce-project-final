import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { detailsProduct } from '../actions/actionProducts';

function ProductMenu (props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails; 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id)); 
        return () => {
            //
        };
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }
    return <div>
        <div className="result-back">
            <Link to="/">Back</Link>
        </div>
        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                (
                    <div className="details">
                        <div className="image-details">
                            <img src={product.image} alt="product"></img>
                        </div>
                        <div className="info-details">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    ${product.price}
                                </li>
                                <li>
                                    {product.description}
                                </li>
                            </ul>
                        </div>
                        <div className="action-details">
                            <ul>
                                <li>
                                    Price: ${product.price}
                                </li>
                                <li>
                                    Status: {product.countInStock > 0 ? "In Stock": "Item currently unavailable."}
                                </li>
                                <li>
                                    Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </li>
                                <li>
                                    {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add Item to Cart</button>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                )
        }
    </div>
}

export default ProductMenu;