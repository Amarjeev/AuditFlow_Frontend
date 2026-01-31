import { Routes, Route } from "react-router-dom";

// import Dashboard from "./pages/dashboard/DashboardPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
// import CreateUserProfile from "./components/admin/users/";
import CreateUserProfile from "./components/admin/users/ui/CreateUserProfile";
import UploadJobs from "./components/upload-jobs/ui/UploadJobs";
import AuditLogs from "./components/audit-logs/ui/AuditLogs";
// import CreateUserProfile from "./components/admin/profile/CreateUserProfilee";
import Login from "./components/auth/ui/Login";
import { useAuthRedirect } from "./services/useAuthRedirect";

import LandingPage from "./pages/Landing/LandingPage";
import UploadJobDetailsPage from "./pages/UploadJobDetails.page";

const App = () => {
  useAuthRedirect();
  return (
    <>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:role" element={<Login />} />

        {/* Admin routes */}
        <Route path="/:role/dashboard" element={<DashboardPage />} />
        <Route path="/admin/users" element={<CreateUserProfile />} />
        <Route path="/:role/upload-jobs" element={<UploadJobs />} />
        <Route path="/:role/upload-jobs/:jobId" element={<UploadJobDetailsPage />} />

        <Route path="/:role/audit-logs" element={<AuditLogs />} />
        {/* <Route path="/admin/profile" element={<CreateUserProfile />} /> */}
      </Routes>
    </>
  );
};

export default App;
