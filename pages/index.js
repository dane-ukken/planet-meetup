import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import Landing from "../components/landing";
import Router from "next/router";

const Home = () => {
  const user = useUser();

  console.log("user", user);

  if (user) {
    Router.push(user.role == "admin" ? "/admin-dashboard" : "/events");
    return;
  }

  return (
    <Layout>
      <Landing></Landing>

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
