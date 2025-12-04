import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  category:any[] = [];
  getProductData:any=[]; 
  selectedValue:any;
  productIdParms:any;
  isError:boolean=false;
  isSuccess:boolean=false;
  isEditButtonDisabled:boolean=false;
  constructor(private _product:ProductService,private _activatedRoute:ActivatedRoute, private _snackbar:SnackbarService){}
  getProduct(){
    this.productIdParms= this._activatedRoute.snapshot.paramMap.get('id');
    this.productIdParms && this._product.get_SingleProduct(this.productIdParms).subscribe((res:any)=>{
      this.getProductData = res.data;
      this.selectedValue = res.data.type;
    })
  }
  getCategroy(){
    this._product.get_Categroy().subscribe((res:any)=>{
      this.category = res.data
    })
  }
  editProduct(data:any){
    this.isEditButtonDisabled=true;
    const abc={
      ...data,
      productCategory:this.selectedValue
    }
    this._product.update_SingleProduct(this.productIdParms,abc).subscribe((res:any)=>{
      this._snackbar.openSnackBar("Updated product successfully", "X");
      this.isSuccess=true;
      this.isEditButtonDisabled=false;
    },(error)=>{
      this.isError = error.error;
    })

  }
  productType(event:any){
    this.selectedValue=event.value
  }
  ngOnInit(){
    this.getProduct();
    this.getCategroy()
  }
}
