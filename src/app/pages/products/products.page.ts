import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/ProductInterfaces';
import { ProductOrder } from '../../../../model/productOrder';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  down=false;
  products:Product[]=[];
  productsOrders:ProductOrder[]=[];

  constructor(
    private productService:ProductService,
    public cartService:CartService
    ) { }

  async ngOnInit() {
    this.productService.getProductAvailables(true).subscribe(data=>{
      this.products=data.products;
    })
    this.productsOrders=await this.cartService.getAllProductOrders();
    this.cartService.newProductOrder.subscribe(async data=>{
      if(data){
        this.productsOrders=await this.cartService.getAllProductOrders();
      }
    })
  }

  sendOrder(){
    //TODO
  }

}
