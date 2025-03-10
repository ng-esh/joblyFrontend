import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
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
  
      <button>Login</button>
      {errors.length > 0 && <p>{errors.join(", ")}</p>}
    </form>
  );
}

export default LoginForm;
