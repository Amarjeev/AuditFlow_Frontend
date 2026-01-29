import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/admin/AdminDashboard";
import Users from "./components/admin/users/Users";
import UploadJobs from "./components/upload-jobs/UploadJobs";
import AuditLogs from "./components/audit-logs/AuditLogs";
import AdminProfile from "./components/admin/profile/AdminProfile";
import Login from "./features/auth/Login";
import { useAuthRedirect } from "./services/useAuthRedirect";

import LandingPage from "./pages/Landing/LandingPage";

const App = () => {
  useAuthRedirect();
  return (
    <>

      <Routes>
        {/* Login */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:role" element={<Login />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/upload-jobs" element={<UploadJobs />} />
        <Route path="/admin/audit-logs" element={<AuditLogs />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>
    </>
  );
};

export default App;
