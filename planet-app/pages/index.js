import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import Landing from "../components/landing"

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>

          <p>You are signed in.</p>
          <img alt="You are viewing content that is only available to signed in users." />
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
