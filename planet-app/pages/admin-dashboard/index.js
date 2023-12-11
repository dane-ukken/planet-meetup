import Layout from "../../components/layout";
import Router from "next/router";
import EventCard from "../../components/eventcard";
import { useUser } from "../../lib/hooks";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsAdmin } from "../../store/features/events/eventSlice";

const AdminHome = () => {
  const user = useUser({ redirectTo: "/" });
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { events, loading, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventsAdmin());
  }, [dispatch]);

  if (!user || user.role !== "admin") {
    return;
  }

  const adminEvents = events.filter((e) => e.eventOrg == user.username);

  const filteredEvents = adminEvents
    .filter((event) => {
      const eventDate = new Date(event.eventDate);
      const start = startDate ? new Date(startDate) : new Date("1970-01-01");
      const end = endDate ? new Date(endDate) : new Date("2999-12-31");
      return eventDate >= start && eventDate <= end;
    })
    .filter((event) =>
      searchTerm
        ? event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

  return (
    <Layout>
      <h1>Admin Dashboard</h1>

      <div className="admin-buttons">
        <button onClick={() => Router.push("/admin-dashboard/add-event")}>
          Add Event
        </button>
      </div>

      <div className="search-and-filter">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
        .admin-buttons {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 2rem;
        }
        .admin-buttons button {
          margin-right: 1rem;
        }
        .admin-buttons button:last-child {
          margin-right: 0;
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
        input {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .search-and-filter {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 1.8rem;
          }
          .admin-buttons {
            justify-content: center;
          }
          .admin-buttons button {
            width: 80%;
            margin-bottom: 1rem;
            min-width: 200px;
          }
          .search-and-filter {
            flex-direction: column;
            align-items: center;
          }
          .search-and-filter input {
            margin-bottom: 0.5rem;
          }
          input {
            width: 80%;
            min-width: 300px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AdminHome;
