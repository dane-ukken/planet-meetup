import Layout from "../../components/layout";
import EventCard from "../../components/eventcard";
import { useUser } from "../../lib/hooks";

const MyEvents = () => {
  const user = useUser();

  if (!user || user.role !== "user") {
    return null;
  }

  const userEvents =
    user.registeredEvents.map((regEvent) => regEvent.event) || [];

  return (
    <Layout>
      <h1>My Events</h1>

      <EventCard itemList={userEvents}></EventCard>

      <style jsx>{`
        h1 {
          font-size: 2.2rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 2rem;
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
