import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchEvents } from "../../store/features/events/eventSlice";
import { useUser } from "../../lib/hooks";
import Layout from "../../components/layout";
import { formatDate, formatTime } from "../../lib/common";

const EventDetails = () => {
  console.log("EventDetails page for event");
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!events) return <p>No event details available.</p>;

  const event = events.find((e) => e._id === id);

  return (
    <Layout>
      <h1>{event.eventName}</h1>
      <img src={event.eventImgUrl} alt={event.eventName} />

      <p className="description">{event.eventDescription}</p>

      <p>
        {formatDate(event.eventDate)} at {formatTime(event.eventTime)}
      </p>
      <p>{event.eventLocation}</p>

      <p style={{ fontSize: "1.3rem" }}>${event.eventPrice} per seat</p>

      <button>Buy Ticket</button>

      <style jsx>{`
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
