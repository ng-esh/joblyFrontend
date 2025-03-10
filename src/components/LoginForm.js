import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  function handleCheckbox(evt) {
    setRememberMe(evt.target.checked);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData, rememberMe);
    if (result.success) {
      navigate("/");
    } else {
      setErrors(result.errors);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <label>
        <input type="checkbox" checked={rememberMe} onChange={handleCheckbox} />
        Remember Me
      </label>
      <button>Login</button>
      {errors.length > 0 && <p>{errors.join(", ")}</p>}
    </form>
  );
}

export default LoginForm;
