import { Role } from "./role.model";

export interface Employee {
    id: number;
    employeename: string;
    roles: Role;
    email: string;
    password: string;
    address: string;
    status: boolean;
  }
  