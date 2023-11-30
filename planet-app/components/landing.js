import Head from "next/head";
import Header from "./header";
import Image from "next/image"; 

const Landing = () => (
  <>
    <main></main>
    <body>
      <h1>Your launchpad to great events.</h1>
      <p>Sign in to proceed.</p>
      <Image
        src="http://localhost:3000/../images/earth-png-25612.png"
        alt="Earth Image"
      />
    </body>

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
    `}</style>
  </>
);

export default Landing;
