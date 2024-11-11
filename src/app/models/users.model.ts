import { Vendor } from './vendor.model';        
import { Employee } from './employee.model';   
import { Role } from './role.model';           
import { Inventory } from './inventory.model';

export interface User {
  id: number;
  fullName: string;
  address: string;
  email: string;
  password: string;
  role: string;
  roles: Role;               
  employees: Employee[];     
  inventories: Inventory[];  
  vendors: Vendor[];         
}
