import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCart } from '../redux/actions';

const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector(state => state.products);
    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <div className="spinner-border" role="status"></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <div className="row g-4" style={{ marginTop: 'auto' }}>
                {products.map(product => {
                    const isInCart = cartItems.some(item => item.productId === product.id);

                    return (
                        <div key={product.id} className="col-md-4">
                            <div className="card" 
                            // style={{backgroundColor: '#D9EAFD'}}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">${product.price}</p>
                                    <p className="card-text">Stock: {product.quantityInStock}</p>
                                    <p className="card-text text-muted">{product.description}</p>
                                    <button
                                        className={`btn ${isInCart ? 'btn-secondary' : 'btn-primary'}`}
                                        onClick={() => {
                                            if (!isInCart) {
                                                dispatch(addToCart({
                                                    productId: product.id,
                                                    productName: product.name,
                                                    price: product.price,
                                                    quantity: 1
                                                }));
                                            }
                                        }}
                                        style={{ cursor: isInCart ? 'not-allowed' : 'pointer' }}
                                        disabled={isInCart} 
                                    >
                                        {isInCart ? 'In Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <Link to="/cart" className="btn btn-primary mt-3">View Cart</Link> */}
        </div>
    );
};

export default ProductList;