export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  googleHash: string;
  createdAt: string;
  avatarUrl: string;
  surname?: string;
  phonePrefix?: string;
  phone?: string;
}
