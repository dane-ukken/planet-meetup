import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchEvents } from "../../../store/features/events/eventSlice";
import { useUser } from "../../../lib/hooks";
import Layout from "../../../components/layout";
import { formatDate, formatTime } from "../../../lib/common";

const EventDetailsEditable = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const { events, loading, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [eventImgUrl, setEventImgUrl] = useState("");

  useEffect(() => {
    if (events && events.length > 0) return;

    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (!events) return;

    const event = events.find((e) => e._id === id);
    if (event) {
      setEventName(event.eventName);
      setEventDescription(event.eventDescription);
      setEventDate(formatDate(event.eventDate));
      setEventTime(formatTime(event.eventTime));
      setEventLocation(event.eventLocation);
      setEventPrice(event.eventPrice);
      setEventStatus(event.eventStatus);
      setMaxAttendees(event.maxAttendees);
      setEventImgUrl(event.eventImgUrl);
    }
  }, [events, id]);

  if (!user || user.role !== "admin") {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSaveClick = (id) => {
    // await fetch(`/events/${id}`) method PUT;
    // router.push("/events/${id}");
  };

  const handleCancelClick = async (id) => {
    router.push(`/events/${id}`);
  };

  return (
    <Layout>
      <h1>Edit Event</h1>

      <div className="edit-field">
        <label htmlFor="eventName">Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
      </div>

      <div className="edit-field">
        <label htmlFor="eventDescription">Description</label>
        <textarea
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
      </div>

      <div className="edit-field">
        <label htmlFor="eventDate">Date</label>
        <input
          type="text"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </div>

      <div className="edit-field">
        <label htmlFor="eventTime">Time</label>
        <input
          type="text"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          required
        />
      </div>

      <div className="edit-field">
        <label htmlFor="eventLocation">Location</label>
        <input
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          required
        />
      </div>

      <div className="edit-field">
        <label htmlFor="eventPrice">Price</label>
        <input
          type="number"
          value={eventPrice}
          onChange={(e) => setEventPrice(e.target.value)}
          required
        />
      </div>

      <div className="edit-field">
        <label htmlFor="eventStatus">Status</label>
        <select
          value={eventStatus}
          onChange={(e) => setEventStatus(e.target.value)}
        >
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="edit-field">
        <label htmlFor="maxAttendees">Maximum Attendees</label>
        <input
          type="number"
          value={maxAttendees}
          onChange={(e) => setMaxAttendees(e.target.value)}
          required
        />
      </div>

      <div className="edit-field">
        <label htmlFor="eventImgUrl">Image URL</label>
        <input
          type="text"
          value={eventImgUrl}
          onChange={(e) => setEventImgUrl(e.target.value)}
          required
        />
      </div>

      <div className="admin-buttons">
        <button onClick={() => handleSaveClick(id)}>Update Event</button>
        <button onClick={() => handleCancelClick(id)}>Cancel</button>
      </div>

      <style jsx>{`
        .edit-field label {
          display: block;
          margin-bottom: 0.76rem;
          font-size: 1.1rem;
        }
        .admin-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        input,
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border-radius: 5px;
          border: 1px solid #ddd;
        }

        textarea {
          height: 100px;
          resize: vertical;
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

        button:hover {
          //   background-color: #0056b3;
        }

        .edit-field select {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border-radius: 5px;
          border: 1px solid #ddd;
          background-color: white;
          font-size: 1rem;
        }

        @media (max-width: 600px) {
          .admin-buttons {
            flex-direction: column;
          }

          input,
          textarea,
          button {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default EventDetailsEditable;
