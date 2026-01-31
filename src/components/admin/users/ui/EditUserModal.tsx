// type Props = {
//   form: any;
//   error: string;
//   showPasswordFields: boolean;
//   setShowPasswordFields: (v: boolean) => void;
//   handleChange: (e: any) => void;
//   updateUser: () => void;
//   setEditUser: (v: null) => void;
// };

// const EditUserModal = ({
//   form,
//   error,
//   showPasswordFields,
//   setShowPasswordFields,
//   handleChange,
//   updateUser,
//   setEditUser,
// }: Props) => {
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <div className="bg-white rounded-xl p-6 w-full max-w-lg">
//         <h2 className="text-xl font-semibold mb-4">Edit User</h2>

//         {error && <div className="error">{error}</div>}

//         <div className="space-y-3">
//           <input className="input" name="name" value={form.name} onChange={handleChange} />
//           <input className="input" name="userid" value={form.userid} onChange={handleChange} />

//           <select className="input" name="role" value={form.role} onChange={handleChange}>
//             <option>Admin</option>
//             <option>Analyst</option>
//             <option>Viewer</option>
//           </select>

//           {!showPasswordFields && (
//             <button
//               onClick={() => setShowPasswordFields(true)}
//               className="text-sm text-blue-600 hover:underline"
//             >
//               Change password
//             </button>
//           )}

//           {showPasswordFields && (
//             <>
//               <input className="input" type="password" name="password" placeholder="New Password" value={form.password} onChange={handleChange} />
//               <input className="input" type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
//             </>
//           )}
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button onClick={() => setEditUser(null)} className="btn-secondary">Cancel</button>
//           <button onClick={updateUser} className="btn-primary">Save Changes</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;
