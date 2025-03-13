import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";

function ProfileForm({ updateUser }) {
  const { currentUser} = useContext(UserContext);
  const [loading, setLoading] = useState(true); // ✅ Added missing state

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
      });
      setLoading(false); // ✅ Ensure loading stops after getting user data
    }
  }, [currentUser]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
          const result = await updateUser(formData);
          if (result.success){
            setSuccess(true);
            setErrors([]);
        } else {
            setErrors(result.errors);
            setSuccess(false);
    } 
    } catch (err) {
        console.error("❌ Profile update failed:", err);
        setErrors(["Update failed"]);
        setSuccess(false);
    }
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      {loading ? <p>Loading profile...</p> : <p>Welcome, {currentUser.firstName}!</p>}
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
