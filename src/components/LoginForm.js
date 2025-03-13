import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css"; 

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));

    if (name === "password") {
      setShowPasswordError(false); // Reset error when user types
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setErrors(result.errors);
      if (result.errors.includes("Invalid username/password")) {
        setShowPasswordError(true);
      }
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
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
          className={showPasswordError ? "input-error" : ""}
        />
        {showPasswordError && <p className="error-message">Incorrect password. Please try again.</p>}
      </div>

      <button type="submit">Login</button>

      {errors.length > 0 && !showPasswordError && <p className="error-message">{errors.join(", ")}</p>}
    </form>
  );
}

export default LoginForm;
