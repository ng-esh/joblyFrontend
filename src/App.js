import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./api";
import NavBar from "./NavBar";
import Routes from "./Routes";
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
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
  async function login(loginData) {
    try {
      let newToken = await JoblyApi.login(loginData);
      setToken(newToken); // ✅ Automatically saves token in localStorage
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

  /** Handle user logout */
  function logout() {
    setCurrentUser(null);
    setToken(null); // ✅ Removes token from localStorage
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
