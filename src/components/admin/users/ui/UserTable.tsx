import type { Props } from "../types/user.types";

const roleStyles: Record<string, string> = {
  admin: "bg-red-100 text-red-700",
  analyst: "bg-blue-100 text-blue-700",
  viewer: "bg-green-100 text-green-700",
};

const UserTable = ({ users, loading, deleteUser, deletingId }: Props) => {
  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading users…</div>;
  }

  if (!users?.length) {
    return <div className="p-6 text-center text-gray-500">No users found</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Desktop Header */}
          <thead className="hidden md:table-header-group bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Mobile
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Role
              </th>
              <th className="px-6 py-3 text-right font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => (
              <tr
                key={user._id}
                className="
                  block md:table-row
                  p-4 md:p-0
                  hover:bg-gray-50
                  transition
                "
              >
                {/* Name */}
                <td className="block md:table-cell px-0 md:px-6 py-1 md:py-4">
                  <span className="md:hidden text-xs text-gray-500">Name</span>
                  <div className="font-medium text-gray-800">{user.name}</div>
                </td>

                {/* Mobile */}
                <td className="block md:table-cell px-0 md:px-6 py-1 md:py-4">
                  <span className="md:hidden text-xs text-gray-500">
                    Mobile
                  </span>
                  <div className="text-gray-600">{user.mobile}</div>
                </td>

                {/* Role */}
                <td className="block md:table-cell px-0 md:px-6 py-1 md:py-4">
                  <span className="md:hidden text-xs text-gray-500">Role</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${roleStyles[user.role]}`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Actions */}
                <td className="block md:table-cell px-0 md:px-6 py-2 md:py-4 md:text-right">
                  <span className="md:hidden text-xs text-gray-500">
                    Actions
                  </span>

                  {user.role.toLowerCase() !== "admin" ? (
                    <button
                      onClick={() => deleteUser(user._id)}
                      className={`
                        mt-1 md:mt-0
                        inline-flex items-center
                        text-sm font-medium text-red-600
                        hover:underline
                        transition
                        ${
                          deletingId === user._id
                            ? "opacity-60 animate-pulse"
                            : ""
                        }
                      `}
                    >
                      {deletingId === user._id ? "Deleting…" : "Delete"}
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      Protected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
