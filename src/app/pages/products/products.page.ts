import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/ProductInterfaces';
import { ProductOrder } from '../../../../model/productOrder';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { SendOrderComponent } from '../../components/send-order/send-order.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  down = false;
  products: Product[] = [];
  productsOrders: ProductOrder[] = [];

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private modalController:ModalController
  ) { }

  async ngOnInit() {
    this.getProductAvailables();
    this.productsOrders = await this.cartService.getAllProductOrders();
    this.cartService.cartChange.subscribe(async () => {
        this.productsOrders = await this.cartService.getAllProductOrders();
    })
  }

  refresh(ev) {
    this.getProductAvailables(ev);
  }

  getProductAvailables(ev?) {
    this.productService.getProductAvailables(true).subscribe(data => {
      this.products = data.products;
      if(ev){
        ev.target.complete();
      }
    })
  }

  async sendOrder() {
    const modal = await this.modalController.create({
      component:SendOrderComponent,
      componentProps:{
        productsOrder:this.productsOrders
      }
    });
    modal.present();
  }

}
