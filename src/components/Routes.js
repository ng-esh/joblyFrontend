import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";
import PrivateRoute from "./PrivateRoute";

function AppRoutes({ login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />

      {/* 🔐 Protected Routes Require Authentication */}
      <Route path="/companies" element={<PrivateRoute><CompanyList /></PrivateRoute>} />
      <Route path="/companies/:handle" element={<PrivateRoute><CompanyDetail /></PrivateRoute>} />
      <Route path="/jobs" element={<PrivateRoute><JobList /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfileForm /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
