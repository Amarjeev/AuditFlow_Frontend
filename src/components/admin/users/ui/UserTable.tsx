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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
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
            <tr key={user?._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-800">
                {user?.name}
              </td>

              <td className="px-6 py-4 text-gray-500">{user?.mobile}</td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    roleStyles[user?.role]
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                {user?.role.toLowerCase() !== "admin" && (
                  <button
                    onClick={() => deleteUser(user?._id)}
                    className={`
                  text-red-600 font-medium
                  transition-all duration-300
                  ${
                    deletingId === user?._id
                      ? "scale-95 opacity-60 animate-pulse"
                      : ""
                  }
                `}
                  >
                    Delete
                  </button>
                )}

                {user?.role.toLowerCase() === "admin" && (
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
  );
};

export default UserTable;
