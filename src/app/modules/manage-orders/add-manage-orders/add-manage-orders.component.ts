import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarComponent } from 'src/app/shared/widgets/snackbar/snackbar.component';

@Component({
  selector: 'app-add-manage-orders',
  templateUrl: './add-manage-orders.component.html',
  styleUrls: ['./add-manage-orders.component.css']
})
export class AddManageOrdersComponent {
  constructor(private _product:ProductService,private _snackBar: MatSnackBar,private _snackbar:SnackbarService){

  }
isCreateOrd:boolean=false;
getAllProduct:any=[];
dataFilter:any;
isError="";
products:any[] = [];
storPro={
  getproductSellingPrice:null,
  getproductQuantity:null,
}
multiProducts:any[]=[]
createPro={
  productId:'',
  productName:'',
  productQuantity:null,
  productSellingPrice:null,
}
isCreateOrderLoader:boolean=false;
getProductHtm(val:any){
  const getValuesFromSelectd = val.target.value
  this.products.map((res:any)=>{
    if(res._id==getValuesFromSelectd){
     this.createPro.productName = res.productName
     this.createPro.productId = res._id
     this.storPro.getproductSellingPrice = res.productSellingPrice      
     this.storPro.getproductQuantity = res.productQuantity      
    }
    
  })
}
addCart(form: any) {
  this.isError = "";

  if (form.invalid) {
    this.isError = "Please fill all required fields!";
    return;
  }
  if ((this.storPro.getproductQuantity ?? 0) <= 0) {
    this.isError = "Product stock is insufficient!";
    return;
  }
  this.multiProducts.push({...this.createPro})
    this._snackbar.openSnackBar("Add to cart successfully", "X");
    this.emptyAllFields()  
    form.resetForm();
    form.submitted = false; 
}


removeCartItem(index: number) {
  this.multiProducts.splice(index, 1);
  this._snackbar.openSnackBar("Remove cart successfully", "X");

}

createOrder(){
  this.isCreateOrderLoader=true;
  if(this.multiProducts.length!=0){
   const orderData = {
    orderItems: this.multiProducts
   }
   this._product.create_Order(orderData).subscribe((res:any)=>{
      if(res.data){
        this.emptyAllFields();
        this.multiProducts.length=0;
        this.getProduct();
    this.isCreateOrd=true;
    this.isCreateOrderLoader=false;
    setTimeout(() => {
        this.isCreateOrd = false;
    }, 3000);
 
  }},(error)=>{
      this.isError=error.error.message;
      this.isCreateOrderLoader=false;
    })
  } else{
    alert("Add at least one product to create order")
  }
}
emptyAllFields(){
  this.createPro = {
    productName:'',
    productId: '',
    productQuantity: null,
    productSellingPrice: null
  };
  this.storPro ={
    getproductSellingPrice:null,
    getproductQuantity:null,
  }
}
getProduct(){
  this._product.get_product().subscribe((res:any)=>{
    this.products = res.data
  })
}
validationPri(){
  if (this.createPro.productSellingPrice == 0 || this.createPro.productSellingPrice == null || this.createPro.productSellingPrice =="") {
    alert("Product Selling Price Should not be 0");
    this.createPro.productSellingPrice = null
  } 
}
validationQuan(){
 if (this.createPro.productQuantity == 0) {
    alert("Product Quantity Should not be 0");
    this.createPro.productQuantity = null
  } 
}
grandTotal(){
  return this.multiProducts.reduce((acc, item) => acc + (item.productSellingPrice * item.productQuantity), 0);
}

ngOnInit(){
   this.getProduct()
}

}

