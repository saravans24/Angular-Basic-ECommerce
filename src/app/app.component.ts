import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'e-commerce';
  cartProducts:any[] =[];
  subTotal:number = 0;

  constructor(private productService: ProductService, private router: Router){
    this.productService.cartAddedSubject.subscribe(res => {
      this.loadCart();
    })
  }

  ngOnInit(): void {
    this.loadCart();
  }

  redirectToSale(){
    this.router.navigateByUrl("sale");
  }

  loadCart(){
    this.subTotal = 0;
    this.productService.getCartItemsByCusId(1).subscribe((res:any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach(element => {
        this.subTotal = this.subTotal + element.productPrice;
      });
      // debugger;
    })
  }


}
