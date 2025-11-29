import { Product } from "../data-type";

export interface OrderItems{
    _id:string,
    quantity:number,
    product:Product
}