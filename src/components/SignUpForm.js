import { useState } from "react";
import JoblyApi from "../api";

function SignupForm({ signup }) {
  const [formData, setFormData] = useState({ username: "", password: "", firstName: "", lastName: "", email: "" });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let token = await JoblyApi.signup(formData);
    signup(token);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <button>Sign Up</button>
    </form>
  );
}

export default SignupForm;
