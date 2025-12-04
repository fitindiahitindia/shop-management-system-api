import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-all-mange-customers',
  templateUrl: './view-all-mange-customers.component.html',
  styleUrls: ['./view-all-mange-customers.component.css']
})
export class ViewAllMangeCustomersComponent {
  totalRecords = 0;    // total items in DB
  pageSize = 5;       // page size
  currentPage = 1;
  
  allCustomers:any[]=[];
  isLoader:boolean = true
constructor(private _product:ProductService){}

getAllCustomer(page: number, limit: number) {
this._product.getCustomerByPag(page, limit).subscribe({
    next: (res: any) => {
      const data = res.data;
      // Convert numeric keys to array
      this.allCustomers = Object.values(data.order).filter(
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
    this.getAllCustomer(this.currentPage, this.pageSize);
  }

ngOnInit(){
  this.getAllCustomer(this.currentPage, this.pageSize);
}

}

