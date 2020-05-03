import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/ProductInterfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products:Product[]=[];

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.getProductAvailables().subscribe(data=>{
      this.products=data.products;
    })
  }

}
