import { Link } from "react-router-dom";

function NavBar({ user, logout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/jobs">Jobs</Link>
      {user ? (
        <>
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
