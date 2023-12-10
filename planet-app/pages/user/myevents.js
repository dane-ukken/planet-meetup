import Layout from "../../components/layout";
import EventCard from "../../components/eventcard";
import { useUser } from "../../lib/hooks";
import { useState } from "react";

const MyEvents = () => {
  const user = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user || user.role !== "user") {
    return null;
  }

  const userEvents =
    user.registeredEvents.map((regEvent) => regEvent.event) || [];

  const filteredEvents = searchTerm
    ? userEvents.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : userEvents;

  return (
    <Layout>
      <h1>My Events</h1>

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

export default MyEvents;
