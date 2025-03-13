import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import "../styles/Navbar.css"

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    logout();
    setShowModal(false);
  }

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/companies">Companies</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>

        {currentUser ? (
          <>
            <li><span>Welcome, {currentUser.username}!</span></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={() => setShowModal(true)}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>

      {showModal && (
        <div className="modal">
          <p>Are you sure you want to log out?</p>
          <button onClick={handleLogout}>Yes, Logout</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
