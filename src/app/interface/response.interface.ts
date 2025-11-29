import { product } from "./product.interface";

export interface response{
   status:string,
   message:string,
   data:product[]
}