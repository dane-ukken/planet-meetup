import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

const Layout = (props) => (
  <>
    <Head>
      <title>Planet - Yout launchpad to great!</title>
    </Head>

    <Header />

    <main>
      <div className="container">{props.children}</div>
    </main>

    <Footer />

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      html,
      body,
      #__next {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      footer {
        margin-top: auto;
      }

      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
    `}</style>
  </>
);

export default Layout;
