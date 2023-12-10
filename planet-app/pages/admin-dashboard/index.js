import Layout from "../../components/layout";
import EventCard from "../../components/eventcard";
import { useUser } from "../../lib/hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/features/events/eventSlice";

const AdminHome = () => {
  const user = useUser({ redirectTo: "/" });
  const { events, loading, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (!user || user.role !== "admin") {
    return;
  }

  const adminEvents = events.filter((e) => e.eventOrg == user.username);

  return (
    <Layout>
      <h1>Admin Dashboard</h1>

      <EventCard itemList={adminEvents}></EventCard>

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

export default AdminHome;