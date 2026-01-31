export type MenuItem = {
  label: string;
  path?: string;
  action?: "logout";
};

export const adminLinks: MenuItem[] = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Upload Jobs", path: "/admin/upload-jobs" },
  { label: "Users", path: "/admin/users" },
  { label: "Audit Logs", path: "/admin/audit-logs" },
  { label: "Logout", action: "logout" },
];

export const analystLinks: MenuItem[] = [
  { label: "Upload Jobs", path: "/analyst/upload-jobs" },
  { label: "Audit Logs", path: "/analyst/audit-logs" },
  { label: "Logout", action: "logout" },
];
