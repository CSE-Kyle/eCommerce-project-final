import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { listProducts } from '../actions/actionProducts';

function HomeMenu (props) {
    const [keywordSearch, setKeywordSearch] = useState('');
    const [orderSort, setOrderSort] = useState('');
    const productList = useSelector(state => state.productList);
    const category = props.match.params.id ? props.match.params.id: '';
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts(category));
        return () => {
            //
        };
    }, [category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, keywordSearch, orderSort));
    }

    const handleSort = (e) => {
        setOrderSort(e.target.value);
        dispatch(listProducts(category, keywordSearch, orderSort));
    }

    return <div>
        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                <ul className="products">
                    {
                        products.map(product => 
                            <li key={product._id}>
                                <div className="product">
                                    <Link to={'/product/' + product._id}>
                                        <img className="image-product" src={product.image} alt="product"/>
                                    </Link>
                                    <div className="name-product">
                                        <Link to={'/product/' + product._id}>{product.name}</Link>
                                    </div>
                                    <div className="price-product">${product.price}</div>
                                </div>
                            </li>
                        )
                    }
                </ul>
        }
    </div>
}

export default HomeMenu;