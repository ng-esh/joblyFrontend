import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./api";
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext";
import useLocalStorage from "./UseLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token", null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        JoblyApi.token = token;
        try {
          let { username } = jwtDecode(token);
          let user = await JoblyApi.getUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Failed to fetch user", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }
    fetchUser();
  }, [token]);

  /** Handle user login */
  async function login(loginData, rememberMe) {
    try {
      let newToken = await JoblyApi.login(loginData);
      if (rememberMe) {
        setToken(newToken); // ✅ Save in localStorage if "Remember Me" is checked
      } else {
        sessionStorage.setItem("jobly-token", newToken); // ✅ Otherwise, use sessionStorage
      }
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
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  async function updateUser(username, newData) {
    try {
      let updatedUser = await JoblyApi.updateUser(username, newData);
      setCurrentUser(updatedUser); // ✅ Updates global state so UI reflects changes
      return true;
    } catch (err) {
      console.error("Update failed:", err);
      return false;
    }
  }

  async function applyToJob(jobId) {
    try {
      if (!currentUser) {
        console.error("No user is logged in. Cannot apply to job.");
        return;
      }
  
      await JoblyApi.applyToJob(currentUser.username, jobId);
  
      setCurrentUser(curr => ({
        ...curr,
        applications: [...(curr.applications || []), jobId], // ✅ Ensure applications is always an array
      }));
  
      console.log(`Applied to job ${jobId}`);
    } catch (err) {
      console.error("Error applying to job:", err);
    }
  }
  

  /** Handle user logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
    sessionStorage.removeItem("jobly-token"); // ✅ Remove session token on logout
  }

  return (
    <UserContext.Provider value={{ currentUser }}>
      <BrowserRouter>
        <NavBar logout={logout} />
        <Routes login={login} signup={signup} updateUser={updateUser} applyToJob={applyToJob} />

      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
