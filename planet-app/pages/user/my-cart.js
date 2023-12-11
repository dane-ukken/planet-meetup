import React from 'react';
import CartTable from '../../components/checkout/cart-table';
import Layout from "../../components/layout";
import "material-icons/iconfont/material-icons.css";
import Router from "next/router";
import { useUser } from "../../lib/hooks";

const CartPage = () => {
  const user = useUser();
  if (!user || user.role !== "user") {
    return null;
  }
  const cartEvents = user.cart.map((cartEvent) => cartEvent.event) || [];

  return (
    <Layout>
      <h1>My Cart</h1>
      {cartEvents.length > 0 ? (
        <>
      <CartTable cartItems={cartEvents}/>
      <button className='btn btn-outline-success'
        onClick={() => {
            Router.push("/user/checkout");
        }}
        >
        Go to Checkout
        </button>
        </>
      ): (
      <>
      <p>You have No Events in your Cart</p>
      </>)}
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

export default CartPage;
