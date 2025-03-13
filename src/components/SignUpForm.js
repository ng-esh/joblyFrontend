import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupForm.css";

function SignupForm({ signup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState([]);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));

    if (name === "username") {
      setUsernameTaken(false); // Reset username error when user types
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      navigate("/");
    } else {
      const formattedErrors = result.errors.map(err =>
        err.replace("instance.", "").replace("does not meet minimum length of", "must be at least")
      );

      setErrors(formattedErrors);

      // Check if the username is taken
      if (result.errors.some(err => err.toLowerCase().includes("username taken"))) {
        setUsernameTaken(true);
      }
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className={usernameTaken ? "input-error" : ""}
        />
        {usernameTaken && <p className="error-message">This username is already taken. Please choose another.</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>

      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>

      <button type="submit">Sign Up</button>

      {errors.length > 0 && (
        <ul className="error-message">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SignupForm;
