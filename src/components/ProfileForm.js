import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import "../styles/ProfileForm.css"

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
    <div className="profile-form">
      <h2>Edit Profile</h2>
      {loading ? <p>Loading profile...</p> : <p>Welcome, {currentUser.firstName}!</p>}
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Save Changes</button>
      </form>

      {success && <p className="success-message">Profile updated successfully!</p>}
      {errors.length > 0 && <p className="error-message">{errors.join(", ")}</p>}
    </div>
  );


  
}

export default ProfileForm;
