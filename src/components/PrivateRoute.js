import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

/** Redirects to login if user is not authenticated */
function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
