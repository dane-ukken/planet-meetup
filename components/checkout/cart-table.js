import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEventAndUpdateCart } from '../../store/features/user/userSlice';

const CartTable = ({ cartItems }) => {
    const [subtotal, setSubtotal] = useState();
    const dispatch = useDispatch();
    const [total, setTotal] = useState();
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.eventPrice, 0);
    };
    const handleDelete = (eventId) => {
      dispatch(deleteEventAndUpdateCart(eventId));
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item._id}>
                <td><img src={item.eventImgUrl} alt={item.eventName} style={{ width: '100px', height: '100px' }} /></td>
                <td>{item.eventName}</td>
                <td>${item.eventPrice}</td>
                <td>
                <button className='btn btn-danger'
                    onClick={() => handleDelete(item._id)}
                    >
                    <i className="bi bi-trash"></i> 
                </button>
                </td>
              </tr>
            ))}
            <tr>
              
              <td><strong>Subtotal</strong></td>
              <td></td>
              <td><strong>${subtotal}</strong></td>
              <td></td>
            </tr>

          </tbody>
        </table>
      </div>
    );
};

export default CartTable;
