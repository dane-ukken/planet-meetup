import Layout from "../components/layout";

const ErrorHome = () => {
  return (
    <Layout>
      <h1>404: Not Found</h1>

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

export default ErrorHome;
