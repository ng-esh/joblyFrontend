import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/jobs">Jobs</Link>

      {currentUser ? (
        <>
          <span>Welcome, {currentUser.username}!</span>
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={logout}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
