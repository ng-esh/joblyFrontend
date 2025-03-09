import { useState, useEffect } from "react";
import JoblyApi from "../api";

function ProfileForm({ username }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    async function fetchUser() {
      let user = await JoblyApi.getUser(username);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
    fetchUser();
  }, [username]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    await JoblyApi.updateUser(username, formData);
    alert("Profile updated successfully!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <button>Update Profile</button>
    </form>
  );
}

export default ProfileForm;
