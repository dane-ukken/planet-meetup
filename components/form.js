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

  const passwordRules = [
    {
      id: "minLength",
      message: "At least 8 characters",
      test: (value) => value.length >= 8,
    },
    {
      id: "number",
      message: "Contains a number",
      test: (value) => /\d/.test(value),
    },
    {
      id: "uppercase",
      message: "Contains an uppercase letter",
      test: (value) => /[A-Z]/.test(value),
    },
    {
      id: "bothPasswordMatch",
      message: "Both passwords must match",
      test: (value) => value === formFields.rpassword,
    },
  ];

  const [passwordRulesMet, setPasswordRulesMet] = useState(
    passwordRules.reduce((acc, rule) => {
      acc[rule.id] = false;
      return acc;
    }, {})
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFields) => {
      const updatedFields = { ...prevFields, [name]: value };

      if (name === "password" || name === "rpassword") {
        setIsPasswordMatch(updatedFields.password === updatedFields.rpassword);

        if (name === "password") {
          const updatedRules = { ...passwordRulesMet };
          passwordRules.forEach((rule) => {
            updatedRules[rule.id] = rule.test(value);
            if (rule.id === "bothPasswordMatch") {
              updatedRules[rule.id] =
                updatedFields.password === updatedFields.rpassword;
            }
          });
          setPasswordRulesMet(updatedRules);
        }
      }

      return updatedFields;
    });
  };

  const canSubmit =
    Object.values(passwordRulesMet).every(Boolean) && isPasswordMatch;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      onSubmit(event);
    } else {
      if (!canSubmit) {
        alert("Please fill in all fields correctly");
        return;
      }
      onSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Username</span>
        <input
          type="text"
          name="username"
          value={formFields.username}
          onChange={handleChange}
          autoComplete="off"
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
            </div>
            <input
              type="password"
              name="password"
              value={formFields.password}
              onChange={handleChange}
              required
            />
            <ul>
              {passwordRules.map((rule) => (
                <li
                  key={rule.id}
                  style={{ color: passwordRulesMet[rule.id] ? "green" : "red" }}
                >
                  {rule.message}
                </li>
              ))}
            </ul>
          </label>
          <label>
            <div className="signup-password-label">
              <span>Repeat password</span>
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
          <label className="role-checkbox">
            <input
              type="checkbox"
              name="role"
              value={formFields.role}
              onChange={handleChange}
            />
            <span className="role-label">Sign up as organizer</span>
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
        ul {
          margin: 0 0 1.2rem;
        }

        #login-success-button {
          background-color: #4caf50;
          color: white;
          border-color: #4caf50;
        }

        .role-checkbox {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0rem 0 3rem;
        }

        .role-checkbox input[type="checkbox"] {
          margin-right: 0.5rem;
        }

        .role-label {
          font-weight: 600;
          color: #36454f;
        }

        @media (max-width: 600px) {
          .signup-password-label,
          label > span,
          .role-label {
            font-size: 14px;
          }

          input {
            padding: 6px;
            margin-bottom: 0.8rem;
          }

          .role-checkbox {
            margin: 1rem 0 2rem;
          }

          .submit > button {
            padding: 0.4rem 0.8rem;
          }

          .error {
            font-size: 14px;
          }
        }
      `}</style>
    </form>
  );
};

export default Form;
