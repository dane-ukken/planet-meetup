import { useState, useEffect } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import Form from "../components/form";

const Signup = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      phone: e.currentTarget.phone.value,
      address: e.currentTarget.address.value,
      password: e.currentTarget.password.value,
      role: e.currentTarget.role.checked ? "admin" : "user",
    };

    // password and repeat password must match
    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    // password length must be atleast 8 characters
    if (body.password.length < 8) {
      setErrorMsg(`Password must be atleast 8 characters long`);
      return;
    }

    // username must contain only letters
    if (!/^[A-Za-z ]+$/.test(body.username)) {
      setErrorMsg(`Username must contain only letters`);
      return;
    }

    //  email must match abc@xyz.hyu pattern
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(body.email)) {
      setErrorMsg(`Invalid email`);
      return;
    }

    // phone must contain only numbers
    if (!/^\d+$/.test(body.phone)) {
      setErrorMsg(`Invalid phone`);
      return;
    }

    // address must contain only letters, numbers, spaces, commas and hyphens
    if (!/^[A-Za-z0-9 ,-]+$/.test(body.address)) {
      setErrorMsg(`Invalid address`);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setSignupSuccess(true);
        setTimeout(() => {
          Router.push("/login");
        }, 1000);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(JSON.parse(error.message).error);
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form
          isLogin={false}
          errorMessage={errorMsg}
          onSubmit={handleSubmit}
          signupSuccess={signupSuccess}
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
        .login input[type="email"],
        .login input[type="password"],
        .login input[type="tel"] {
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

export default Signup;
