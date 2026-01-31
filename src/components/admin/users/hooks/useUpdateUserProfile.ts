// import { useState } from "react";
// import { updateUserForm } from "../types/user.types";

// const initialForm: updateUserForm = {
//   name: "",
//   username: "",
//   role: "Viewer",
// };

// export const useUpdateUserProfile = () => {
//   const [form, setForm] = useState<updateUserForm>(initialForm);
//   const [editUser, setEditUser] = useState<updateUserForm | null>(null);
//   const [showPasswordFields, setShowPasswordFields] = useState(false);
//   const [error, setError] = useState("");

//   const openEdit = (user: User) => {
//     setEditUser(user);
//     setShowPasswordFields(false);
//     setForm({
//       name: user.name,
//       userid: user.userid,
//       role: user.role,
//     });
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const updateUser = () => {
//     if (!form.name || !form.userid) {
//       return setError("Name and User ID are required");
//     }

//     setUsers(
//       users.map((u) =>
//         u.id === editUser?.id
//           ? { ...u, name: form.name, userid: form.userid, role: form.role }
//           : u,
//       ),
//     );

//     setEditUser(null);
//   };

//   const toggleStatus = (id: number) => {
//     setUsers(users.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
//   };

//   const deleteUser = (id: number) => {
//     setUsers(users.filter((u) => u.id !== id));
//   };

//   return {
//     form,
//     error,
//     editUser,
//     showPasswordFields,
//     setShowPasswordFields,
//     openEdit,
//     handleChange,
//     updateUser,
//     toggleStatus,
//     deleteUser,
//   };
// };
