import { useState, useEffect, useCallback} from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext";
import useLocalStorage from "./UseLocalStorage";
import "./App.css";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token", null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /** ✅ Define `fetchUser` globally using `useCallback()` */
  const fetchUser = useCallback(async () => {
    if (!token) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }
  
    JoblyApi.token = token;
    try {
      let { username } = jwtDecode(token);
      let user = await JoblyApi.getUser(username);

      console.log("🔍 Fetching user from API:", user); 
     
      setCurrentUser({
        ...user,
        applications: new Set (user.applications || [] ), // 🔄 **RESET applied jobs on refresh**
      });
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      setCurrentUser(null);
    }
    setLoading(false);
  }, [token]);

   /** ✅ Place useEffect() here, AFTER fetchUser is defined */
   useEffect(() => {
    fetchUser();
  }, [fetchUser]); // ✅ Only runs when `fetchUser` changes

  useEffect(() => {
    if (currentUser) {
      console.log("✅ Redirecting after login:", currentUser);
      navigate("/dashboard");  // ✅ Ensure this only runs when `currentUser` exists
      }
    }, [currentUser, navigate]); // ✅ Runs when `currentUser` updates
  
  /** Handle user login */
  async function login(loginData) {
    try {
      let newToken = await JoblyApi.login(loginData);
      setToken(newToken);
      await fetchUser(); // ✅ Call fetchUser after login to update user state
      console.log("👤 currentUser after login:", currentUser); // ✅ Debugging log
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }
  
  /** Handle user signup */
  async function signup(signupData) {
    try {
      let newToken = await JoblyApi.signup(signupData);
      setToken(newToken);
      await fetchUser(); // ✅ Call fetchUser after signup
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  /** Handle job application */
  async function applyToJob(jobId) {
    if (!currentUser) return;
    try {
        await JoblyApi.applyToJob(currentUser.username, jobId);
        
        // ✅ Immediately update applications in state
        setCurrentUser(prevUser => ({
            ...prevUser,
            applications: new Set ([...prevUser.applications, jobId]),
        }));
    } catch (err) {
      console.error("❌ Error applying to job:", err); // Logs any errors
    }
  }

  /** Handle user profile updates */
  async function updateUser(updatedData) {
    try {
        let updatedUser = await JoblyApi.updateUser(currentUser.username, updatedData);
        setCurrentUser(updatedUser);
        return { success: true };
    } catch (errors) {
        return { success: false, errors };
    }
  }

  /** Handle user logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("jobly-token");
    sessionStorage.clear();
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser }}>
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} applyToJob={applyToJob} updateUser={updateUser} />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
