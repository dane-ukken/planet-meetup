import React, { useState, useEffect } from "react";
import Link from "next/link";
import "material-icons/iconfont/material-icons.css";
import { formatDate, formatSpotsLeftText, formatTime } from "../lib/common";
import { useUser } from "../lib/hooks";

const Card = ({
  title,
  id,
  date,
  time,
  location,
  spotsLeft,
  imageUrl,
  price,
  isCancelled,
  iconName,
  onIconClick,
  onClickLink,
}) => {
  const user = useUser();
  const isRegistered =
    user.registeredEvents.length > 0
      ? user.registeredEvents.find((e) => e.event._id === id)
      : false;
  const inCart =
    user.cart.length > 0 ? user.cart.find((e) => e.event._id === id) : false;
  const isAdmin = user.role === "admin";
  const isHidden = isRegistered || inCart || isAdmin;

  return (
    <>
      <Link href={onClickLink} legacyBehavior>
        <div className="card">
          {imageUrl && (
            <div className="card-image">
              <img src={imageUrl} alt={title} />
              {isCancelled && (
                <div className="cancelled-overlay">Cancelled</div>
              )}
            </div>
          )}
          <div className="card-content">
            <h3>{title}</h3>
            <p className="card-date">
              {formatDate(date)} at {formatTime(time)}
            </p>
            {location && <p className="card-location">{location}</p>}
            <p className="card-spotsLeft">{formatSpotsLeftText(spotsLeft)}</p>
          </div>
          {!isHidden &&  (
            <div
              className="card-action"
              style={{ visibility: !spotsLeft || isHidden ? "hidden" : "" }}
            >
              <p>{price}</p>
              <button onClick={onIconClick}>
                <span className="material-icons">{iconName}</span>
              </button>
            </div>
          )}
          {isRegistered && (
            <div
              style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}
              className="card-action"
            >
              <i className="material-icons bi bi-check2-circle"></i>
            </div>
          )}
          {inCart && (
            <div
              style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}
              className="card-action"
            >
              <i className="bi bi-bag-fill"></i>
            </div>
          )}
        </div>
      </Link>

      <style jsx>{`
        p {
          margin: 5px 0;
        }
        .card-image {
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .card-image::before {
          content: "";
          display: block;
          padding-top: 66.66%; // Aspect ratio of 3:2
        }
        .cancelled-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 0, 0, 0.6);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .card {
          max-width: 300px;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          // margin: auto;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .card-date {
          font-size: 0.8rem;
        }
        .card-time {
          font-size: 0.8rem;
        }
        .card-location {
          font-size: 0.8rem;
        }
        .card-spotsLeft {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          margin-bottom: 0;
        }
        .card-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-content {
          padding: 0.5rem 1rem;
          text-align: flex-start;
        }
        .card-content h3 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
        }
        .card-action p {
          font-size: 1.3rem;
          margin: 0;
          color: #666;
        }
        .card-action {
          padding: 0rem 0rem 0rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-action button {
          background-color: white;
          border: 1px solid #ddd;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 5px;
        }
        .card-action button:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .card-action .material-icons {
          font-size: 1.3rem;
        }

        @media (max-width: 600px) {
          .card {
            min-width: 350px;
          }
          .card-image {
            height: auto;
          }
        }
      `}</style>
    </>
  );
};

export default Card;
