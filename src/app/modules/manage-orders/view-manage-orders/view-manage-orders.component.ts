import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from 'src/app/data-type';
import { orderStatus } from 'src/app/services/enum';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-manage-orders',
  templateUrl: './view-manage-orders.component.html',
  styleUrls: ['./view-manage-orders.component.css']
})
export class ViewManageOrdersComponent {
  orderStatus:any = orderStatus;
  ordersLenght:number=0
  constructor(private _product:ProductService, private _activatedRoute:ActivatedRoute){}
  orderDetails:any=[];
  totalprice:number[]=[]
  totalquantity:number[]=[]
  shippingcharge:any=[]
  totalpricevar = 0
  totalquantityvar = 0;
  isLoader:boolean=true
  orderStatusValue=""
  orderId = this._activatedRoute.snapshot.paramMap.get('id');
  orderStatusVal:string=""
  orderStatusVal2:string=""
  ispopupStatus:boolean = false;
  popupMsg=""
  orderDetailsLoader:boolean=true;
  
  getOrderDetails(){
   if(this.orderId){
   this._product.get_UserOrder(this.orderId).subscribe((res:any)=>{
      this.orderDetails =res.data.order[0]; 
      this.orderDetailsLoader=false
   })
  }
  
  }

   total(){
     let price=0
     let quan = 0
    setTimeout(()=>{
    for(let i=0;i<this.orderDetails[0].orders.length;i++){
     price += this.orderDetails[0].orders[i].product.price*this.orderDetails[0].orders[i].quantity;
     quan += this.orderDetails[0].orders[i].quantity;
    }},1000)

    setTimeout(()=>{
   this.totalpricevar = price;
   this.totalquantityvar = quan;
    },2000)
  }
  
  getOrderStatus(){
    this._product.get_SingleOrderStatus(this.orderId).subscribe((res:any)=>{
     this.orderStatusVal2 = res.orderStatus
   })
  }
  OnOrderStatus(val:any){
    this.orderStatusVal=val.target.value
  }
  OnOrderStatusSave(id:any){
    if(this.orderStatusVal !=""){
    const statusObj = {status:this.orderStatusVal}
    this._product.set_OrderStatus(id,statusObj).subscribe((res:any)=>{
      this.getOrderStatus();
      // this.ispopupStatus=true
      setTimeout(() => {
        this.ispopupStatus=false;
      }, 3000);
      this.popupMsg = res.message
    },error=>{this.popupMsg = error.message})
  }else{
    alert("please select status")
  }
  }
  ngOnInit(){
    this.getOrderDetails();
    // this.total();
    // this.getOrderStatus();
  }
}
