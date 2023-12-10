import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchEvents } from "../../../store/features/events/eventSlice";
import { useUser } from "../../../lib/hooks";
import Layout from "../../../components/layout";
import { formatDate, formatTime } from "../../../lib/common";

const EventAttendees = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const { events, loading, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (events && events.length > 0) return;

    dispatch(fetchEvents());
  }, [dispatch]);

  if (!user || user.role !== "admin") {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!events) return <p>No event details available.</p>;

  const event = events.find((e) => e._id === id);

  if (event.eventOrg !== user.username) {
    return null;
  }

  return (
    <Layout>
      <div className="top-bar">
        <div style={{ margin: "0" }}>
          <button
            className="back-button"
            onClick={() => router.push(`/events/${id}`)}
          >
            <span className="material-icons">arrow_back</span>
          </button>
        </div>
      </div>

      <h1>{event.eventName}</h1>

      {/* <div className="attendees-list">
        <div className="attendee">
          <p>Attendee Name</p>
          <p>Attendee Email</p>
          <p>Attendee Phone</p>
        </div>
      </div> */}
      <p className="title-text">Attendees List</p>

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
        p {
          font-size: 1rem;
          marginbottom: 1rem;
        }
        .title-text {
          margin: 0px;
          font-size: 1.3rem;
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

export default EventAttendees;
