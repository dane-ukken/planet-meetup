import Link from "next/link";
import { useUser } from "../lib/hooks";
import { Vina_Sans } from "next/font/google";
const vinaSans = Vina_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const Footer = () => {
  const user = useUser();

  return (
    <>
      <footer>
        <nav className={vinaSans.className}>
          <ul>
            <li>
              <Link href="#top" legacyBehavior>
                <a style={{ marginLeft: "20px" }}>Back To Top</a>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/about" legacyBehavior>
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>

      <style jsx>{`
        nav {
          width: 100%;
          margin: 0 0 0 0;
          background-color: black;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        h1 {
          text-shadow: 2px 2px 2px lightblue;
          font-size: 3em;
          margin: 0 0 0 2%;
          display: inline;
          // border: 2px solid red;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
          padding-right: 2%;
          // border: 2px solid red;
          font-size: 1.5em;
        }
        li {
          margin-right: 2rem;
        }
        li:first-child {
          margin-left: auto;
        }
        li:last-child {
          margin-right: 0;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

export default Footer;
