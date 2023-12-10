import Layout from "../../components/layout";
import EventCard from "../../components/eventcard";
import { useUser } from "../../lib/hooks";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/features/events/eventSlice";

const UserHome = () => {
  const user = useUser({ redirectTo: "/" });
  const { events, loading, error } = useSelector((state) => state.events);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (events && events.length > 0) return;

    dispatch(fetchEvents());
  }, [dispatch]);

  if (!user || user.role !== "user") {
    return null;
  }

  const filteredEvents = searchTerm
    ? events.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : events;

  return (
    <Layout>
      <h1>Available Events</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <EventCard itemList={filteredEvents} />

      <style jsx>{`
        h1 {
          font-size: 2.2rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 2rem;
        }
        .search-bar {
          margin-bottom: 1rem;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default UserHome;
