import React from "react";
import "material-icons/iconfont/material-icons.css";
import { formatDate, formatTime } from "../lib/common";

const Card = ({
  title,
  date,
  time,
  location,
  imageUrl,
  price,
  iconName,
  onIconClick,
}) => {
  return (
    <div className="card">
      {imageUrl && (
        <div className="card-image">
          <img src={imageUrl} alt={title} />
        </div>
      )}
      <div className="card-content">
        <h3>{title}</h3>
        {date && <p className="card-date">{formatDate(date)}</p>}
        {time && <p className="card-time">{formatTime(time)}</p>}
        {location && <p className="card-location">{location}</p>}
      </div>
      {iconName && (
        <div className="card-action">
          <p>{price}</p>
          <button onClick={onIconClick}>
            <span className="material-icons">{iconName}</span>
          </button>
        </div>
      )}

      <style jsx>{`
        p {
          margin: 5px 0;
        }
        .card {
          max-width: 300px;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          margin: auto;
          cursor: pointer;
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
        .card-image img {
          width: 100%;
          height: 200px;
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
            min-width: 300px;
          }
          .card-image img {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
