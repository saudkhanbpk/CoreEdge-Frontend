import { User } from "./users.model";

export interface Catalog {
    id?: number;
    materialId:string;
    partNumber: string;
    shortDescription:string;
    longDescription:string;
    customerPrice:string;
    manufacturerPartNumber:string;
    manufacturerName:string;
    unspc:string;
    imageUrl:string;
    quantityAvailable:number;
    category:string;  
    vendor:string; 
    user:User
  }
  