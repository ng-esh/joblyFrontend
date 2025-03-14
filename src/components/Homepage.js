import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import "../styles/Homepage.css";

function Homepage() {
  const navigate = useNavigate();  // ✅ Initialize navigate

  return (
    <div className="homepage">
      <h1>Welcome to Jobly</h1>
      <p>Your gateway to great job opportunities.</p>
      <button className="homepage-btn" onClick={() => navigate("/companies")}>
        Get Started
      </button>  {/* ✅ Clicking this button now navigates to /companies */}
    </div>
  );
}

export default Homepage;
