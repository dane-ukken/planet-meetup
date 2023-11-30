import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import Landing from "../components/landing";
import EventCard from "../components/eventcard";

const Home = () => {
  const user = useUser();
  const list = [
    {
      title: "Orange",
      img: "/images/xmas.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/xmas.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/xmas.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/xmas.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/xmas.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/xmas.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/xmas.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/xmas.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <Layout>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>

          <p>You are signed in.</p>
          <EventCard itemList={list}></EventCard>
        </>
      ) : (
        <>
          <Landing></Landing>
        </>
      )}

      <style jsx>{`
        h1 {
          font-size: 2.2rem;
          font-weight: 600;
          color: #333;
          font-family: "Helvetica Neue", Arial, sans-serif;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.3rem;
          line-height: 1.6;
          color: #555;
          font-family: "Arial", sans-serif;
        }
        img {
          margin-top: 2rem;
          width: 100%;
          max-width: 600px; // Limit the maximum size
          display: block;
          aspect-ratio: 1/1;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        @media (max-width: 600px) {
          h1 {
            font-size: 1.8rem;
          }
          p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;
