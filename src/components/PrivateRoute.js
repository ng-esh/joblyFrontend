import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";

/** Redirects to login if user is not authenticated */
function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser !== null) {
      setLoading(false);
    }
  }, [currentUser]); // ✅ Ensure reactivity

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
