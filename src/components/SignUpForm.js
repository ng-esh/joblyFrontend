import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
  const [formData, setFormData] = useState({ username: "", password: "", firstName: "", lastName: "", email: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
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
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <button>Sign Up</button>
      {errors.length > 0 && <p>{errors.join(", ")}</p>}
    </form>
  );
}

export default SignupForm;
