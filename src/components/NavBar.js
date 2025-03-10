import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    logout();
    setShowModal(false);
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/jobs">Jobs</Link>

      {currentUser ? (
        <>
          <span>Welcome, {currentUser.username}!</span>
          <Link to="/profile">Profile</Link>
          <button onClick={() => setShowModal(true)}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}

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
