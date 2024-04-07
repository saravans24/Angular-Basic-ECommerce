import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any [] = [];
  cartObj:any = {
    "CartId": 0,
    "CustId": 1,
    "ProductId": 0,
    "Quantity": 0,
    "AddedDate": "2024-04-07T11:44:23.846Z"
  }
  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    // debugger;
    this.loadAllProducts();
  }

  loadAllProducts(){
    // debugger;
    this.productService.getAllProducts().subscribe((result:any) => {
      this.productList = result.data;
      console.log(this.productList);
    })
  }

  addItemToCart(ProductId: number){
    // debugger;
    this.cartObj.ProductId = ProductId;
    this.productService.addToCart(this.cartObj).subscribe((result:any) => {
      // this.productList = result.data;
      if(result.result){
        alert("Product Added to Cart");
        this.productService.cartAddedSubject.next(true);
      }
    })
  }

}
