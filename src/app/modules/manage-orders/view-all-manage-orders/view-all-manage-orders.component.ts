import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from 'src/app/services/product.service';

export interface allOrder{
  _id: string,
  productId: {orderId:string},
  productQuantity: number,
  productSellingPrice:number,
  createdBy: {},
  orderId: string,
  dateOrdered: string,
  __v: number,
  updateOrderList:[]

}

@Component({
  selector: 'app-view-all-manage-orders',
  templateUrl: './view-all-manage-orders.component.html',
  styleUrls: ['./view-all-manage-orders.component.css']
})
export class ViewAllManageOrdersComponent {
  allOrders:any[]=[];
  isLoader:boolean = true
  updateOrderList: string[] = [];
  deleteOrder = {
    _id:'',
    productId:'',
    productQuantity:''
  }
  totalRecords = 0;    // total items in DB
  pageSize = 5;       // page size
  currentPage = 1;
  constructor(private _product:ProductService){}  
  
  getAllOrders(page: number, limit: number) {
  this._product.get_AllUserOrders(page, limit).subscribe({
    next: (res: any) => {
      const data = res.data;
      // Convert numeric keys to array
      this.allOrders = Object.values(data.order).filter(
        (item: any) => typeof item === 'object' && !Array.isArray(item)
      );
      // Get updateOrderList separately if it exists
      this.isLoader = false;
      this.totalRecords = res.total;
    },
    error: (err) => {
      console.error('Error fetching orders:', err);
      this.isLoader = false;
    }
  });
}

onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;  // Angular uses 0-based index

    this.getAllOrders(this.currentPage, this.pageSize);
  }

removeOrder(orderId:any,productId:any,productQuantity:any){
  let removeConfirm=confirm("Are you sure delete Order");
    if(removeConfirm==true){
    this.isLoader=true;
    this.deleteOrder._id = orderId;
    this.deleteOrder.productId = productId;
    this.deleteOrder.productQuantity = productQuantity;
    this._product.remove_Order(orderId).subscribe((res:any)=>{
      this.getAllOrders(this.currentPage, this.pageSize);
      this.isLoader=false;
    },(error:Response)=>{
      if(error.status===404){
        alert("This order has already deleted.")
      }else{
        alert("An unexpected error occurred.")
      }
    })
    }   
}
   
  ngOnInit(){
    this.getAllOrders(this.currentPage, this.pageSize);
  }
}
