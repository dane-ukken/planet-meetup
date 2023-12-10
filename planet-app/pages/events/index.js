import Layout from "../../components/layout";
import EventCard from "../../components/eventcard";
import { useUser } from "../../lib/hooks";

const About = () => {
  const user = useUser({ redirectTo: "/login" });

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
      <h1>Welcome, {user.username}!</h1>

      <EventCard itemList={list}></EventCard>

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

export default About;
