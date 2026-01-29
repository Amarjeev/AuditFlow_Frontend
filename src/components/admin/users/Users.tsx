import React, { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", userid: "admin01", role: "Admin", active: true },
    { id: 2, name: "Data Analyst", userid: "analyst01", role: "Analyst", active: true },
    { id: 3, name: "View Only", userid: "viewer01", role: "Viewer", active: false },
  ]);

  const [form, setForm] = useState({
    name: "",
    userid: "",
    password: "",
    confirmPassword: "",
    role: "Viewer",
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [error, setError] = useState("");

  /* ---------- Common Change Handler ---------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  /* ---------- Create User ---------- */
  const handleCreateUser = () => {
    if (!form.name || !form.userid || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setUsers([
      ...users,
      {
        id: Date.now(),
        name: form.name,
        userid: form.userid,
        role: form.role,
        active: true,
      },
    ]);

    setForm({
      name: "",
      userid: "",
      password: "",
      confirmPassword: "",
      role: "Viewer",
    });

    setShowCreateForm(false); // 👈 hide form after create
  };

  /* ---------- Edit User ---------- */
  const openEdit = (user) => {
    setEditUser(user);
    setShowPasswordFields(false);
    setForm({
      name: user.name,
      userid: user.userid,
      password: "",
      confirmPassword: "",
      role: user.role,
    });
    setError("");
  };

  const handleUpdateUser = () => {
    if (!form.name || !form.userid) {
      setError("Name and User ID are required");
      return;
    }

    if (showPasswordFields) {
      if (!form.password || !form.confirmPassword) {
        setError("Please enter password and confirm password");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    setUsers(
      users.map((u) =>
        u.id === editUser.id
          ? { ...u, name: form.name, userid: form.userid, role: form.role }
          : u
      )
    );

    setEditUser(null);
  };

  /* ---------- Other Actions ---------- */
  const toggleStatus = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">Create, edit and manage users</p>
        </div>

        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary"
        >
          + Create User
        </button>
      </div>

      {/* Create User Form (conditional) */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Create New User</h2>

          {error && <div className="error">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input className="input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            <input className="input" name="userid" placeholder="User ID" value={form.userid} onChange={handleChange} />
            <select className="input" name="role" value={form.role} onChange={handleChange}>
              <option>Admin</option>
              <option>Analyst</option>
              <option>Viewer</option>
            </select>
            <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <input className="input" type="password" name="confirmPassword" placeholder="Re-enter Password" value={form.confirmPassword} onChange={handleChange} />
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={handleCreateUser} className="btn-primary">
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setError("");
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="th">Name</th>
              <th className="th">User ID</th>
              <th className="th">Role</th>
              <th className="th">Status</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="td">{user.name}</td>
                <td className="td text-gray-500">{user.userid}</td>
                <td className="td"><span className="badge">{user.role}</span></td>
                <td className="td">
                  <span className={`status ${user.active ? "bg-green-500" : "bg-red-500"}`}>
                    {user.active ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="td space-x-3">
                  <button onClick={() => openEdit(user)} className="link text-blue-600">Edit</button>
                  <button onClick={() => toggleStatus(user.id)} className="link text-yellow-600">
                    {user.active ? "Disable" : "Enable"}
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="link text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal (unchanged) */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>

            {error && <div className="error">{error}</div>}

            <div className="space-y-3">
              <input className="input" name="name" value={form.name} onChange={handleChange} />
              <input className="input" name="userid" value={form.userid} onChange={handleChange} />
              <select className="input" name="role" value={form.role} onChange={handleChange}>
                <option>Admin</option>
                <option>Analyst</option>
                <option>Viewer</option>
              </select>

              {!showPasswordFields && (
                <button onClick={() => setShowPasswordFields(true)} className="text-sm text-blue-600 hover:underline">
                  Change password
                </button>
              )}

              {showPasswordFields && (
                <>
                  <input className="input" type="password" name="password" placeholder="New Password" value={form.password} onChange={handleChange} />
                  <input className="input" type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditUser(null)} className="btn-secondary">Cancel</button>
              <button onClick={handleUpdateUser} className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .input { border:1px solid #e5e7eb; border-radius:8px; padding:10px; width:100%; }
        .input:focus { border-color:#2563eb; box-shadow:0 0 0 1px #2563eb; }
        .btn-primary { background:#2563eb; color:#fff; padding:10px 20px; border-radius:8px; }
        .btn-secondary { background:#e5e7eb; padding:10px 20px; border-radius:8px; }
        .error { background:#fee2e2; color:#b91c1c; padding:8px; border-radius:6px; margin-bottom:10px; }
        .th { padding:16px; text-align:left; }
        .td { padding:16px; }
        .badge { background:#eff6ff; color:#2563eb; padding:4px 10px; border-radius:999px; font-size:12px; }
        .status { color:white; padding:4px 10px; border-radius:999px; font-size:12px; }
        .link { font-weight:500; }
      `}</style>
    </div>
  );
}

export default Users;
