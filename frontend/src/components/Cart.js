import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartQuantity, removeFromCart, placeOrder, fetchCart } from '../redux/actions';

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h5 className="card-title mb-0">Shopping Cart</h5>
      </div>
      <div className="card-body">
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                  <h6>{item.productName} X {item.quantity}</h6>
                  <p className="mb-0">${item.price*item.quantity}</p>
                </div>
                <div className=" d-flex gap-2">
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: '80px' }}
                    min="1"
                    value={item.quantity}
                    onChange={e => dispatch(updateCartQuantity(item.id, parseInt(e.target.value)))}
                  />
                  <button 
                    className="btn btn-danger"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 text-end">
              <p className="h4">Total: ${total.toFixed(2)}</p>
              <button 
                className="btn btn-success mt-2"
                onClick={() => dispatch(placeOrder(items))}
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;