import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import Landing from "../components/landing";
import EventCard from "../components/eventcard";
import { useState, useEffect } from "react";

const Home = () => {
  const user = useUser();
  // const [list, setList] = useState([]);
  //Insert Initial data in DB
  // (async () => {
  //   await seedInitialData();
  // })();

  // useEffect(() => {
  //   // Fetch the seed data here from your endpoint
  //   fetch("/api/events") // Replace '/api/getSeedData' with your actual endpoint
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Received events", data);
  //       setList(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching seed data:", error);
  //     });

  //   // // Simulate user data - replace this with your user authentication logic
  //   // setUser({ username: 'John Doe', role: 'admin' }); // Example user object
  // }, []);

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

  const admin_list = [
    {
      title: "Event1",
      img: "/images/xmas.jpeg",
      price: "$5.50",
    },
    {
      title: "Event2",
      img: "/images/xmas.jpeg",
      price: "$3.00",
    },
  ];

  return (
    <Layout>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>

          <p>You are signed in.</p>
          <EventCard
            itemList={user.role == "admin" ? admin_list : list}
          ></EventCard>
        </>
      ) : (
        <>
          <Landing></Landing>
        </>
      )}

      <style jsx>{`
        html,
        body,
        #__next {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
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
