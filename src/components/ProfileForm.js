import { useState, useContext } from "react";
import UserContext from "../UserContext";

function ProfileForm({ updateUser }) {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await updateUser(currentUser.username, formData);
      setSuccess(true);
      setErrors([]);
    } catch (err) {
      setErrors(err);
      setSuccess(false);
    }
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Save Changes</button>
      </form>
      {success && <p style={{ color: "green" }}>Profile updated successfully!</p>}
      {errors.length > 0 && <p style={{ color: "red" }}>{errors.join(", ")}</p>}
    </div>
  );
}

export default ProfileForm;
