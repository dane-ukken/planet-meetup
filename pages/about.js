import Layout from "../components/layout";

const About = () => {
  return (
    <Layout>
      <h1>CS 6314 (Fall 2023) - Final Project</h1>

      <h2>Group 20: Team Members</h2>
      <ul>
        <li>Adarsh Ramesh Kumar (AXR210179)</li>
        <li>Anthea Abreo (AXA210122)</li>
        <li>Dane Ukken Shaji (DSU220000)</li>
        <li>Gautham Shaji (GXS210034)</li>
        <li>Justine George (JXG210092)</li>
      </ul>

      <h2>Project Report</h2>
      <ul>
        <li>
          <a href="https://drive.google.com/xxx">PDF</a>
        </li>
      </ul>

      <h2>Project Demo</h2>
      <ul>
        <li>
          <a href="https://www.youtube.com/xxx">Video</a>
        </li>
      </ul>

      <style jsx>{`
        h1 {
          font-size: 2.2rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1rem;
          color: #666;
        }

        @media (max-width: 600px) {
          .profile-field-container {
            flex-direction: column;
            align-items: flex-start;
          }
          h1 {
            font-size: 1.8rem;
          }
          h3 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default About;
