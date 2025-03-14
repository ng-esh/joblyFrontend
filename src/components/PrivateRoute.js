import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

/** Redirects to login if user is not authenticated */
function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);

    if (currentUser === null) {
      return <p>Loading...</p>;
    } // ✅ Ensure reactivity

    if (!currentUser) {
      console.log("🔒 Redirecting to login - User not authenticated.");
      return <Navigate to="/login" />;
    }
    return children;
}

export default PrivateRoute;
