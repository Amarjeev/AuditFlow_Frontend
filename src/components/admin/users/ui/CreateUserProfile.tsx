import CreateUserForm from "./CreateUserForm";
import UserTable from "./UserTable";
import AdminNavbar from "../../../navbar/ui/AdminNavbar";
import { useCreateUser } from "../hooks/useCreateUser";
import { useDeleteUsersProfile } from "../hooks/usedeleteUsersProfile";

function CreateUserProfile() {
  const user = useCreateUser();
  const userData = useDeleteUsersProfile();

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              User Management
            </h1>
            <p className="text-sm text-gray-500">
              Create, edit and manage users
            </p>
          </div>

          <button
            onClick={() => user.setShowCreateForm(true)}
            className="
              flex items-center justify-center gap-2
              w-full sm:w-auto
              px-4 py-2.5
              rounded-lg
              bg-blue-600 text-white
              text-sm font-medium
              shadow-sm
              hover:bg-blue-700
              transition
            "
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
        <div className="mt-6">
          <UserTable
            users={userData?.users}
            loading={userData?.loading}
            deleteUser={userData?.handleDeleteUser}
            deletingId={userData?.deletingId}
          />
        </div>
      </div>
    </>
  );
}

export default CreateUserProfile;
