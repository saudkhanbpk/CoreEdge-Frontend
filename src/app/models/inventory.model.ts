import { User } from "./users.model";

export interface Inventory {
    id: number;
    materialId:string;
    partNumber: string;
    shortDescription:string;
    longDescription:string;
    price:string;
    manufacturerPartNumber:string;
    manufacturerName:string;
    unspc:string;
    ImageUrl:string;
    quantityAvailable:number;
    category:string;  
    user:User
  }
  