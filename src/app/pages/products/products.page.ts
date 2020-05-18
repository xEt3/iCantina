import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/ProductInterfaces';
import { ProductOrder } from '../../../../model/productOrder';
import { CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { SendOrderComponent } from '../../components/orders-components/send-order/send-order.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  loading=false;
  term:string=undefined ;
  down = false;
  products: Product[] = [];
  productsFound: Product[] = [];
  infineScrollEnable = true;

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.nexts(null, true);
  }

  nexts(ev?, reset: boolean = false) {
    if (reset) {
      this.infineScrollEnable = true;
    }
    if (this.term===undefined  )
      this.getProductsAvailables(reset,ev);
    else {
      this.searchProductsAvailables(reset,ev);
    }
  }

  private getProductsAvailables(reset=false,ev){
    if(reset){
      this.loading=true;
      this.products = [];
    }
    this.productService.getProductAvailables(reset).subscribe(data => {
      this.products.push(...data.products);
      this.loading=false;
      if (data.products.length === 0) {
        this.infineScrollEnable = false;
      }
      if (ev) {
        ev.target.complete();
      }
    })
  }

  private searchProductsAvailables(reset=false,ev){
    if(reset){
      this.productsFound=[];
      this.loading=true
    }
    this.productService.searchProductAvailables(this.term,reset).subscribe(data=>{
      this.productsFound.push(...data.products);
      this.loading=false;
      if (data.products.length === 0) {
        this.infineScrollEnable = false;
      }
      if (ev) {
        ev.target.complete();
      }
    })
  }

  onSearchChange(ev){
    const term=ev.detail.value;
    if(term!==""){
      this.term=term;
      this.nexts(null,true)
    }else{
      this.term=undefined;
    }
  }

  async sendOrder() {
    const modal = await this.modalController.create({
      component: SendOrderComponent
    });
    modal.present();
  }

}
