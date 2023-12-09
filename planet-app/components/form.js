import Link from "next/link";
import { useState } from "react";

const Form = ({
  isLogin,
  errorMessage,
  onSubmit,
  signupSuccess,
  loginSuccess,
}) => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
    rpassword: "",
    email: "",
    address: "",
    phone: "",
    role: "user",
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });

    if (name === "password") {
      setIsPasswordMatch(value === formFields.rpassword && value.length >= 8);
    } else if (name === "rpassword") {
      setIsPasswordMatch(value === formFields.password && value.length >= 8);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Username</span>
        <input
          type="text"
          name="username"
          value={formFields.username}
          onChange={handleChange}
          required
        />
      </label>

      {isLogin ? (
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formFields.password}
            onChange={handleChange}
            required
          />
        </label>
      ) : (
        <>
          <label>
            <div className="signup-password-label">
              <span>Password</span>
              {isPasswordMatch && <span> ☑️</span>}
            </div>
            <input
              type="password"
              name="password"
              value={formFields.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <div className="signup-password-label">
              <span>Repeat password</span>
              {isPasswordMatch && <span> ☑️</span>}
            </div>
            <input
              type="password"
              name="rpassword"
              value={formFields.rpassword}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formFields.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Address</span>
            <input
              type="text"
              name="address"
              value={formFields.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Phone</span>
            <input
              type="text"
              name="phone"
              value={formFields.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <div style={{ display: "flex" }}>
              <input
                type="checkbox"
                name="role"
                value={formFields.role}
                onChange={handleChange}
                required
              />
              <span style={{ marginLeft: "1%" }}> Sign up as organizer</span>
            </div>
          </label>
        </>
      )}

      <div className="submit">
        {isLogin ? (
          <>
            <Link href="/signup" legacyBehavior>
              <a>I don't have an account</a>
            </Link>
            <button
              type="submit"
              id={loginSuccess ? "login-success-button" : ""}
            >
              {loginSuccess ? "✔ Logged In" : "Login"}
            </button>
          </>
        ) : (
          <>
            <Link href="/login" legacyBehavior>
              <a>I already have an account</a>
            </Link>
            <button
              type="submit"
              id={signupSuccess ? "signup-success-button" : ""}
            >
              {signupSuccess ? "✔ Signed Up" : "Signup"}
            </button>
          </>
        )}
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .signup-password-label {
          font-weight: 600;
        }
        .submit {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          justify-content: space-between;
        }
        .submit > a {
          text-decoration: none;
          color: #36454f;
        }
        .submit > button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: background-color 0.3s ease, color 0.3s ease,
            border-color 0.3s ease;
        }
        .submit > button:hover {
          border-color: #888;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }

        #signup-success-button {
          background-color: #4caf50;
          color: white;
          border-color: #4caf50;
        }

        #login-success-button {
          background-color: #4caf50;
          color: white;
          border-color: #4caf50;
        }
      `}</style>
    </form>
  );
};

export default Form;
