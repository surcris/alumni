import { Roles } from './roles.enum';

export type User = {
  id?: number;
  email: string;
  role: Roles;
}

export type Users = User[];
