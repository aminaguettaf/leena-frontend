import React, { useContext, useEffect, useState } from 'react';
import './Order.css';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Order = () => {
  const { token } = useContext(AppContext);
  const [order, setOrder] = useState(null); // Initialize as null instead of an empty string

  const showOrder = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/order/user-orders',{},{ headers: { token } });
      if (response.data.success) {
        setOrder(response.data.order);
        console.log(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    showOrder();
  }, [token]);

  const total = () => {
    if (!order?.items) return 0;
    return order.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  return (
    <div className="order-details mb-5">
      <div className="container d-flex gap-5">
        <div className="your-order">
          <h3>Your Order</h3>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <p className="fw-bold">Product</p>
            <p className="fw-bold">Subtotal</p>
          </div>
          {order?.items?.map((item) => (
            <div className="d-flex align-items-center justify-content-between mb-4" key={item._id}>
              <p>{item.name} X {item.quantity}</p>
              <p className="fw-bold">{item.price * item.quantity} D.A</p>
            </div>
          ))}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <p>Subtotal</p>
            <p className="fw-bold">{total()} D.A</p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <p>Shipping</p>
            <p className="fw-bold">Livraison offerte gratuitement</p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <p>Total</p>
            <p className="fw-bold">{total()} D.A</p>
          </div>
        </div>
        <div className="billing">
          <h3>Billing Address</h3>
          <p className="mb-2 fw-bold">
            {order?.userInfos?.data?.firstName} {order?.userInfos?.data?.lastName}
          </p>
          <p className="mb-2">{order?.userInfos?.data?.phone}</p>
          <p className="mb-2">
            {order?.userInfos?.address?.country}-{order?.userInfos?.address?.wilaya}-
            {order?.userInfos?.address?.city}
          </p>
          <p className="mb-2">{order?.userInfos?.data?.alladdress}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
