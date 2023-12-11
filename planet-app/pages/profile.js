import { useUser } from "../lib/hooks";
import Layout from "../components/layout";

const getPrettyDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Profile = () => {
  const user = useUser({ redirectTo: "/login" });

  return (
    <Layout>
      <h1>Profile Details</h1>
      {user && (
        <div className="profile-field-main-container">
          <div className="profile-field-container" >
            <h3>Username</h3>
            <p>{user.username}</p>
          </div>
          <div className="profile-field-container">
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
          <div className="profile-field-container">
            <h3>Address</h3>
            <p>{user.address}</p>
          </div>
          <div className="profile-field-container">
            <h3>Phone</h3>
            <p>{user.phone}</p>
          </div>
          <div className="profile-field-container">
            <h3>User since</h3>
            <p>{getPrettyDate(user.createdAt)}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .profile-field-main-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .profile-field-container {
          max-width: 600px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }

        h1 {
          font-size: 2.2rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 3rem;
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

export default Profile;
