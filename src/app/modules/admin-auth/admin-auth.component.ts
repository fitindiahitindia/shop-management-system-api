import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLogin } from 'src/app/interface/AdminLogin.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {
  constructor(private _product: ProductService, private _router: Router) {}
  isOpen:boolean = false;
  isLogin: boolean = false;
  errorStatus: string = '';
  loginObj:AdminLogin = {
    shopId: '',
    password: '',
  };
  registerObj:any = {
    shopName:'',
    ownerName:'',
    mobileNo:'',
    email:'',
    address:'',
    password:''
  }
  adminLogin(loginForm:AdminLogin) {
    this.loginObj.shopId = loginForm.shopId;
    // this.loginObj.password = btoa(loginForm.password+`_${Date.now()}`);
    this.loginObj.password = loginForm.password;
    this._product.login_admin(this.loginObj).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this._product.setAdminLoginToken(res.data);
          this.errorStatus = '';
          this.isLogin = true;
          this._product.isAdminLoggedIn.next(true);
          this.registerObjectEmpty();

          setTimeout(() => {
            this.isLogin = false;
            const isCheckout=localStorage.getItem("adminlogintoken");
            if(isCheckout){
            this._router.navigate(['/', 'admin-dashboard']);
            }
          }, 2000);
        } else {
          this.errorStatus = res.message;
        }
      },
      (error) => {
        this.errorStatus = error.error.message;
      }
    );
  }
  adminRegister(registerForm:any){
    this.registerObj.shopName = registerForm.shopName;
    this.registerObj.password = registerForm.password;
    this.registerObj.ownerName = registerForm.ownerName
    this.registerObj.mobileNo = registerForm.mobileNo
    this.registerObj.email = registerForm.email
    this.registerObj.address = registerForm.address
    // this.loginObj.password = btoa(loginForm.password+`_${Date.now()}`);
    this._product.register_admin(this.registerObj).subscribe(
      (res: any) => {
        alert(res.status)
      },
      (error) => {
        this.errorStatus = error.error.message;
      }
    );
  }

  registerObjectEmpty() {
    this.loginObj.shopId = '';
    this.loginObj.password = '';
  }
}
