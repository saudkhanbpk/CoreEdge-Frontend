import { Vendor } from './vendor.model';        // Assuming you have a Vendor model
import { Employee } from './employee.model';    // Assuming you have an Employee model
import { Role } from './role.model';            // Assuming you have a Role model
import { Inventory } from './inventory.model';

export interface User {
  id: number;
  fullName: string;
  address: string;
  email: string;
  password: string;
  role: string;
  roles: Role;               // Role assigned to the user
  employees: Employee[];      // Employees associated with the user
  inventories: Inventory[];   // Inventories owned by the user
  vendors: Vendor[];          // Vendors associated with the user
}
