import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchEventsAdmin } from "../../../store/features/events/eventSlice";
import { useUser } from "../../../lib/hooks";
import Layout from "../../../components/layout";

const EventAttendees = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const [attendees, setAttendees] = useState([]);
  const { events, loading, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (events && events.length > 0) return;

    dispatch(fetchEventsAdmin());
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

  useEffect(() => {
    if (!event) return;
    const fetchAttendees = async () => {
      const response = await fetch(`/api/attendees?id=${event._id}`);
      if (response.status !== 200) {
        console.log("Error fetching attendees");
        return;
      }

      const data = await response.json();
      setAttendees(data.attendees);
    };

    fetchAttendees();
  }, [event]);

  return (
    <Layout>
      <div className="top-bar">
        <div>
          <button
            className="back-button"
            onClick={() => router.push(`/events/${id}`)}
          >
            <span className="material-icons">arrow_back</span>
          </button>
        </div>
      </div>

      <h1>{event.eventName}</h1>

      <p className="title-text">Attendees List</p>

      {attendees.length > 0 ? (
        <div className="attendees-list">
          {attendees.map((attendee, index) => (
            <div key={index} className="attendee">
              <p>{attendee.username}</p>
              <p>{attendee.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No attendees for this event (yet).</p>
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
        p {
          font-size: 1rem;
          marginbottom: 1rem;
        }
        .title-text {
          margin: 1rem 0;
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
          padding: 0.75rem 1rem;
          font-size: 1rem;
          background-color: #333;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .attendees-list {
          display: flex;
          flex-direction: column;
        }
        .attendee {
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
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
