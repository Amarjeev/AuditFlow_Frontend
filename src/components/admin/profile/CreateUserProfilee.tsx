import React, { useState } from "react";
import AdminNavbar from "../../navbar/AdminNavbar";

function CreateUserProfilee() {
  const [profile, setProfile] = useState({
    username: "admin.auditflow",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");

  const handleUsernameUpdate = () => {
    if (!profile.username.trim()) {
      setMessage("Username cannot be empty");
      return;
    }
    setMessage("Username updated successfully");
  };

  const handlePasswordUpdate = () => {
    if (!password.current || !password.new || !password.confirm) {
      setMessage("All password fields are required");
      return;
    }

    if (password.new !== password.confirm) {
      setMessage("New password and confirm password do not match");
      return;
    }

    setMessage("Password updated successfully");

    setPassword({
      current: "",
      new: "",
      confirm: "",
    });
  };

  return (
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Profile
        </h1>
        <p className="text-gray-500">
          Manage your account details and security
        </p>
      </div>

      {message && (
        <div className="mb-6 bg-blue-50 text-blue-700 p-4 rounded-lg">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Profile Information
          </h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            onClick={handleUsernameUpdate}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Username
          </button>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Security
          </h2>

          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password.new}
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={handlePasswordUpdate}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default CreateUserProfilee;
