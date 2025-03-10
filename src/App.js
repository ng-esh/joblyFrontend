import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./api";
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jobly-token") || null);

  // Load user info when token changes
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
  async function login(loginData) {
    try {
      let newToken = await JoblyApi.login(loginData);
      setToken(newToken);
      localStorage.setItem("jobly-token", newToken);
      return { success: true };
    } catch (errors) {
      console.error("Login failed", errors);
      return { success: false, errors };
    }
  }

  /** Handle user signup */
  async function signup(signupData) {
    try {
      let newToken = await JoblyApi.signup(signupData);
      setToken(newToken);
      localStorage.setItem("jobly-token", newToken);
      return { success: true };
    } catch (errors) {
      console.error("Signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handle user logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("jobly-token");
  }

  return (
    <UserContext.Provider value={{ currentUser }}>
      <BrowserRouter>
        <NavBar logout={logout} />
        <Routes login={login} signup={signup} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
