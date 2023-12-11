import Image from "next/image";
import Router from "next/router";

const imageDimension = 800;

const Landing = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>Your Launchpad to Amazing Events.</h1>
    <button
      onClick={() => {
        Router.push("/login");
      }}
    >
      Start Exploring
    </button>
    <div className="landing-image-container">
      <Image
        src="/images/earth-png-25612.png"
        alt="Earth Image"
        sizes="100vw"
        width={imageDimension}
        height={imageDimension}
        style={{
          marginTop: "2rem",
          width: "100%",
          height: "auto",
          filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.3))",
        }}
      />
    </div>

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        background-color: black;
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
      h1 {
        font-family: "Open Sans", sans-serif;
        font-size: 2em;
        color: white;
        text-align: center;
      }
      p {
        font-family: "Open Sans", sans-serif;
        color: grey;
        text-align: center;
      }
      button {
        background-color: #fff;
        border: none;
        border-radius: 0.25rem;
        font-size: 1.25rem;
        padding: 1rem 1rem;
        margin: 2rem 0;
        width: 40%;
        cursor: pointer;
      }

      .landing-image-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media (max-width: 600px) {
        button {
          width: 40%;
          min-width: 120px;
          font-size: 1rem;
        }

        h1 {
          font-size: 1.5em;
        }
      }
    `}</style>
  </div>
);

export default Landing;
