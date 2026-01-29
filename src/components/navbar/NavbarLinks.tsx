export type MenuItem = {
  label: string
  path?: string
  action?: "logout"
  children?: MenuItem[]
}

export const adminLinks: MenuItem[] = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Upload Jobs", path: "/admin/upload-jobs" },
  { label: "Users", path: "/admin/users" },
  { label: "Reconciliation", path: "/admin/reconciliation" },
  { label: "Audit Logs", path: "/admin/audit-logs" },

  {
    label: "Settings",
    children: [
      { label: "Profile", path: "/admin/profile" },
      { label: "Logout", action: "logout" },
    ],
  },
]
