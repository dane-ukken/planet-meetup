import Layout from "../../components/layout";
import EventCard from "../../components/eventcard";

const About = () => {
  const admin_list = [
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
  ];

  return (
    <Layout>
      <h1>Admin Dashboard</h1>

      <EventCard itemList={admin_list}></EventCard>

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
