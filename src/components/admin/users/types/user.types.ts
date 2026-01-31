export type Role = "Admin" | "Analyst" | "Viewer";

export type updateUserForm = {
  _id: number;
  name: string;
  mobile: string;
  role: Role;
};

export type UserForm = {
  name: string;
  mobile: string;
  password?: string;
  confirmPassword?: string;
  role: Role;
};

export type CreateUserFormProps = {
  form: UserForm;
  error: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  createUser: () => void;
  handleCancel: () => void;
  loading: boolean;
};

export type User = {
  _id: string;
  name: string;
  mobile: string;
  role: Role;
};

export type Props = {
  users: User[];

  loading: boolean;
  deleteUser: (id: string) => void;
  deletingId: string;
};
