import Head from "next/head";
import Header from "./header";
import Image from "next/image";

const imageDimension = 900;

const Landing = () => (
  <>
    <main></main>
    <h1>Your launchpad to great events.</h1>
    <p>Sign in to proceed!</p>
    <div className="landing-image-container">
      <Image
        src="/images/earth-png-25612.png"
        alt="Earth Image"
        sizes="100vw"
        width={imageDimension}
        height={imageDimension}
        style={{
          marginTop: "2rem",
          width: "120%",
          height: "auto",
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
      .landing-image-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </>
);

export default Landing;
