import CreateUserForm from "./CreateUserForm";
import UserTable from "./UserTable";
// import EditUserModal from "./EditUserModal";
import AdminNavbar from "../../../navbar/AdminNavbar";
import { useCreateUser } from "../hooks/useCreateUser";
import { useDeleteUsersProfile } from "../hooks/usedeleteUsersProfile";

function CreateUserProfile() {
  const user = useCreateUser();
  const userData = useDeleteUsersProfile();

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-gray-500">Create, edit and manage users</p>
          </div>

          <button
            onClick={() => user.setShowCreateForm(true)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-small shadow-sm
             hover:bg-blue-700 transition-all duration-200"
          >
            <span className="text-lg leading-none">＋</span>
            Create User
          </button>
        </div>

        {/* Create Form */}
        {user.showCreateForm && (
          <CreateUserForm
            form={user.form}
            error={user.error}
            handleChange={user.handleChange}
            createUser={user.handleCreateUser}
            handleCancel={user.handleCancel}
            loading={user.loading}
          />
        )}

        {/* Users Table */}
        <UserTable
          users={userData?.users}
          loading={userData?.loading}
          deleteUser={userData?.handleDeleteUser}
          deletingId={userData?.deletingId}
        />

        {/* Edit Modal */}
        {/* {user.editUser && (
          <EditUserModal
            form={user.form}
            error={user.error}
            showPasswordFields={user.showPasswordFields}
            setShowPasswordFields={user.setShowPasswordFields}
            handleChange={user.handleChange}
            updateUser={user.updateUser}
            setEditUser={user.setEditUser}
          />
        )} */}
      </div>
    </>
  );
}

export default CreateUserProfile;
