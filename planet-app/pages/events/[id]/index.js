import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchEvents } from "../../../store/features/events/eventSlice";
import { useUser } from "../../../lib/hooks";
import Layout from "../../../components/layout";
import {
  formatDate,
  formatSpotsLeftText,
  formatTime,
} from "../../../lib/common";

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const { events, loading, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (events && events.length > 0) return;

    dispatch(fetchEvents());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  const isRegistered =
    user.registeredEvents.length > 0
      ? user.registeredEvents.find((e) => e.event._id === id)
      : false;

  const inCart =
    user.cart.length > 0 ? user.cart.find((e) => e._id === id) : false;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!events) return <p>No event details available.</p>;

  const event = events.find((e) => e._id === id);

  const handleEditClick = () => {
    router.push(`/events/${id}/edit`);
  };

  const handleDeleteClick = async () => {
    // await fetch(`/events/${id}`); method: DELETE
    // router.push("/admin-dashboard");
  };

  const handleViewAttendeesClick = () => {
    router.push(`/events/${id}/attendees`);
  };

  const handleAddToCartClick = async () => {
    // await fetch(`/add-to-cart`); method: POST body: { userId: user._id, eventId: event._id }
  };

  const handleRemoveFromCartClick = async () => {
    // await fetch(`/remove-from-cart`); method: POST body: { userId: user._id, eventId: event._id }
  };

  const handleUnRegisterClick = async () => {
    // await fetch(`/events/unregister`); method: POST body: { userId: user._id, eventId: event._id }
  };

  return (
    <Layout>
      <div className="top-bar">
        <div style={{ margin: "0" }}>
          <button
            className="back-button"
            onClick={() => router.push(`/events`)}
          >
            <span className="material-icons">arrow_back</span>
          </button>
        </div>
        {user.role === "admin" && (
          <div className="admin-buttons">
            <button onClick={handleEditClick}>Edit Event</button>
            <button onClick={handleDeleteClick}>Delete Event</button>
            <button onClick={handleViewAttendeesClick}>View Attendees</button>
          </div>
        )}
      </div>

      <h1>{event.eventName}</h1>
      <img src={event.eventImgUrl} alt={event.eventName} />

      <p style={{ margin: "1rem 0" }} className="description">
        {event.eventDescription}
      </p>
      <p style={{ margin: "1rem 0" }} className="organizer">
        From {event.eventOrg}
      </p>

      <p style={{ margin: "0", fontSize: "1.2rem" }}>
        ${event.eventPrice} per spot
      </p>

      <p style={{ margin: "1rem 0" }}>
        {formatDate(event.eventDate)} at {formatTime(event.eventTime)}
      </p>
      <p>{event.eventLocation}</p>

      <p style={{ marginTop: "1rem" }}>
        {formatSpotsLeftText(event.spotsLeft)}
      </p>

      {user.role === "user" && (
        <div className="user-buttons">
          {isRegistered ? (
            <button onClick={handleUnRegisterClick}>Unregister</button>
          ) : inCart ? (
            <button onClick={handleRemoveFromCartClick}>
              Remove from Cart
            </button>
          ) : (
            <button onClick={handleAddToCartClick}>Add to Cart</button>
          )}
        </div>
      )}

      <style jsx>{`
        .top-bar {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .back-button {
          background-color: transparent;
          border: 1px solid #333;
          color: #333;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        h1 {
          font-size: 2.2rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 2rem;
        }
        .admin-buttons {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
        }
        .admin-buttons button {
          margin-right: 1rem;
        }
        .user-buttons {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .user-buttons button {
          width: 30%;
        }
        p {
          font-size: 1rem;
          marginbottom: 1rem;
        }
        .description {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          margin-bottom: 1rem;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1.2rem;
          background-color: #333;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 1.8rem;
          }
          .admin-buttons,
          .user-buttons {
            flex-direction: column;
          }
          .admin-buttons button,
          .user-buttons button {
            width: 100%;
            margin-bottom: 1rem;
            min-width: 200px;
          }
          .back-button {
            margin-bottom: 1rem;
            width: 100%;
          }
          .top-bar {
            flex-direction: column;
          }
          img {
            height: auto;
            min-height: 100px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default EventDetails;
