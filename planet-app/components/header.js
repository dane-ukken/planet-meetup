import Link from "next/link";
import { useUser } from "../lib/hooks";
import Router from "next/router";
import { useCallback, useEffect, useRef } from "react";
import Head from "next/head";
import { Vina_Sans } from "next/font/google";
const vinaSans = Vina_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const Header = () => {
  const user = useUser();
  const isAdmin = user && user.role === "admin" ? true : false;
  const logoutTimer = useRef(null);
  const TIMER_1_MINUTE = 1000 * 60;
  const TIMER_1_HOUR = TIMER_1_MINUTE * 60;
  const events = [
    "mousemove",
    "mousedown",
    "touchstart",
    "scroll",
    "resize",
    "focus",
    "click",
    "keydown",
  ];

  const logoutDueToInactivity = useCallback(() => {
    console.log("Logout due to inactivity");
    Router.push("/api/logout");
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(logoutDueToInactivity, TIMER_1_HOUR);
    };

    if (user) {
      events.forEach((event) => window.addEventListener(event, handleActivity));

      // Set initial timer
      logoutTimer.current = setTimeout(logoutDueToInactivity, TIMER_1_HOUR);
    }

    return () => {
      clearTimeout(logoutTimer.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [logoutDueToInactivity, user]);

  return (
    <>
      <Head>
        <title>Landing Page</title>
      </Head>
      <header>
        <nav className={vinaSans.className}>
          <h1 className={vinaSans.className}>
            <Link href="/" legacyBehavior>
              <a>planet</a>
            </Link>
          </h1>
          <ul>
            <li>
              <Link href="/" legacyBehavior>
                <a>Home</a>
              </Link>
            </li>
            {user ? (
              <>
                {!isAdmin && (
                  <li>
                    <Link href="/user/my-events" legacyBehavior>
                      <a>My Events</a>
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/profile" legacyBehavior>
                    <a>Profile</a>
                  </Link>
                </li>
                {!isAdmin && (
                  <li>
                    <Link href="/user/my-cart" legacyBehavior>
                      <a>Cart</a>
                    </Link>
                  </li>
                )}
                <li>
                  <a href="/api/logout">Logout</a>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" legacyBehavior>
                  <a>Login</a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <style jsx>{`
        nav {
          width: 100%;
          margin: 0 0 2% 0;
          background-color: black;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        h1 {
          // text-shadow: 2px 2px 2px lightblue;
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
        header {
          color: #fff;
          background-color: black;
          margin-top: 0;
          // border: 2px solid red;
        }
        @media (max-width: 600px) {
          h1 {
            font-size: 1.8rem;
            margin: 0;
          }
          nav {
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          ul {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
          }
          li {
            margin: 5px 0;
            display: flex;
            justify-content: center;
          }
          li:first-child {
            margin-left: unset;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
