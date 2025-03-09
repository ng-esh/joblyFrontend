import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./api";
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import {jwtDecode} from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jobly-token") || null);

  // Load user info when token changes
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        JoblyApi.token = token;
        try {
          let { username } = jwtDecode(token);
          let user = await JoblyApi.getUser(username);
          setUser(user);
        } catch (err) {
          console.error("Failed to fetch user", err);
          setUser(null);
        }
      } else {
        setUser(null);
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
    setUser(null);
    setToken(null);
    localStorage.removeItem("jobly-token");
  }

  return (
    <BrowserRouter>
      <NavBar user={user} logout={logout} />
      <Routes login={login} signup={signup} user={user} />
    </BrowserRouter>
  );
}

export default App;
