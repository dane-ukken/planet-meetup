import { useState, useEffect } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import Form from "../components/form";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const [errorMsg, setErrorMsg] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setLoginSuccess(true);
        setTimeout(() => {
          Router.push("/");
        }, 1000);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form
          isLogin
          errorMessage={errorMsg}
          onSubmit={handleSubmit}
          loginSuccess={loginSuccess}
        />
      </div>
      <style jsx>{`
        .login {
          max-width: 25rem;
          margin: 0 auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        .login form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login input[type="text"],
        .login input[type="password"] {
          padding: 0.8rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        .login button {
          padding: 0.8rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }

        .login button:hover {
          background-color: #0056b3;
        }

        .login .error {
          color: #d9534f;
          font-size: 0.9rem;
        }

        @media (max-width: 600px) {
          .login {
            padding: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Login;
