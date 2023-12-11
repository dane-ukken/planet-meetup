import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Router from "next/router";

const CheckoutTable = ({ cartItems }) => {
  const [subtotal, setSubtotal] = useState();
  const [total, setTotal] = useState();
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.eventPrice, 0);
  };

  useEffect(()=>{
    const calculatedTotal = calculateTotal().toFixed(2);
    setSubtotal(calculatedTotal);
    setTotal((calculatedTotal*1.1).toFixed(2));
  }, [calculateTotal]);

  return (
    <div>
      <table className="table check-table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Event Name</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td><img src={item.eventImgUrl} alt={item.eventName} style={{ width: '100px', height: '100px' }} /></td>
              <td>{item.eventName}</td>
              <td>${item.eventPrice}</td>
            </tr>
          ))}
          <tr>
            <td>Subtotal</td>
            <td></td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td></td>
            <td>${(0.1*subtotal).toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td></td>
            <td><strong>${total}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutTable;
