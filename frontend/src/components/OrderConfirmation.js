import React from 'react';
import { useSelector } from 'react-redux';

const OrderConfirmation = () => {
  const { order } = useSelector(state => state.cart);

  if (!order) return null;

  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="alert alert-success">
          Order placed successfully! Order ID: {order.id}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;