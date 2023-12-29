import React, { useEffect } from 'react';
import CheckoutTable from '../../components/checkout/checkout-table';
import Layout from "../../components/layout";
import "material-icons/iconfont/material-icons.css";
import { useRouter } from "next/router";
import { useUser } from "../../lib/hooks";
import { useDispatch, useSelector } from 'react-redux';
import { registerEvents, resetRegisteredFlag } from '../../store/features/user/userSlice';

const CheckoutPage = () => {
  const user = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, hasRegistered } = useSelector(state => state.user);
  if (!user || user.role !== "user") {
    return null;
  }
  const cartEvents = user.cart.map((cartEvent) => cartEvent.event) || [];

  const handleRegisterEvents = () => {
    dispatch(registerEvents());
  };

  useEffect(() => {
    if (hasRegistered) {
      dispatch(resetRegisteredFlag());
      router.push('/user/my-events');
    }
  }, [hasRegistered, router]);

  useEffect(() => {
    if (error) {
      alert(`Registration failed: ${error}`);
    }
  }, [error]);

  return (
    <Layout>
      <h1>Checkout</h1>
      <CheckoutTable cartItems={cartEvents}/>
      {!loading &&
      <button className='btn btn-outline-success'
        onClick={handleRegisterEvents}
        >
            Register and Pay
        </button>
      }
      {loading && <p>Loading...</p>}
      <style jsx>{`
        h1 {
          font-size: 2.2rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 2rem;
        }
        .check-table tr {
            border-bottom: 1px solid #f0f0f0; /* Faint line for row separation */
          }
          .btn {
            margin: 1rem 0;
            width: 100%;
          }
      `}</style>
    </Layout>
    
  );
};

export default CheckoutPage;
