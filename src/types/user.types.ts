export type UserRole = "admin" | "user";

export type User = {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
};
