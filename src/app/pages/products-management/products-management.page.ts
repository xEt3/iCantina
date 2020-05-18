import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/ProductInterfaces';
import { ProductsManagementService } from '../../services/products-management.service';
import { ModalController } from '@ionic/angular';
import { NewProductComponent } from '../../components/products-components/new-product/new-product.component';
import { EditProductComponent } from '../../components/products-components/edit-product/edit-product.component';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.page.html',
  styleUrls: ['./products-management.page.scss'],
})
export class ProductsManagementPage implements OnInit {

  products: Product[] = []
  productsFound: Product[] = []
  infineScrollEnable = true;
  loading = false;
  term: string = undefined;

  constructor(
    private productsManagementService: ProductsManagementService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.nexts(null, true);
    this.productsManagementService.changeProduct.subscribe(data => {
      this.nexts(null, true);
    })
  }

  refresh(ev) {
    this.nexts(ev, true);
  }

  async nexts(ev?, reset: boolean = false) {
    if (reset) {
      this.infineScrollEnable = true;
    }
    if (this.term===undefined  )
      this.getProducts(reset,ev);
    else {
      this.searchProductsAvailables(reset,ev);
    }
  }

  private async getProducts(reset = false, ev) {
    if (reset) {
      this.loading = true;
      this.products = [];
    }
    const query = await this.productsManagementService.getProducts(reset);
    query.subscribe(data => {
      this.products.push(...data.products);
      this.loading=false;
      if (data.products.length === 0) {
        this.infineScrollEnable = false;
      }
      if (ev) {
        ev.target.complete();
      }
    });
  }

  private searchProductsAvailables(reset=false,ev){
    if(reset){
      this.productsFound=[];
      this.loading=true
    }
    this.productsManagementService.searchProducts(this.term,reset).subscribe(data=>{
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
  async newProduct() {
    const modal = await this.modalController.create({
      component: NewProductComponent

    });
    modal.present();
  }

}
