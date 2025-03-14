import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";
import PrivateRoute from "./PrivateRoute";

function AppRoutes({ login, signup, updateUser, applyToJob }) {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />

      {/* 🔐 Debugging Logs for Protected Routes */}
          {console.log("🔐 Rendering protected routes...")}
          <Route path="/companies" element={<PrivateRoute><CompanyList /></PrivateRoute>} />
          <Route path="/companies/:handle" element={<PrivateRoute><CompanyDetail applyToJob={applyToJob} /></PrivateRoute>} />
          <Route path="/jobs" element={<PrivateRoute><JobList applyToJob={applyToJob} /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfileForm updateUser={updateUser} /></PrivateRoute>} />
        
      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;