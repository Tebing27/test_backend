export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  is_active: boolean;
  register_date: Date;
}
