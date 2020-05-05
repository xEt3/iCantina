import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/ProductInterfaces';
import { ProductsManagementService } from '../../services/products-management.service';
import { ModalController } from '@ionic/angular';
import { NewProductComponent } from '../../components/new-product/new-product.component';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.page.html',
  styleUrls: ['./products-management.page.scss'],
})
export class ProductsManagementPage implements OnInit {

  products: Product[] = []

  constructor(private productsManagementService: ProductsManagementService,
    private modalController:ModalController
    ) { }

  async ngOnInit() {
    await this.getProducts();
    this.productsManagementService.changeProduct.subscribe(data=>{
      this.getProducts();
    })
  }

  refresh(ev){
    this.getProducts(ev);
  }

  async getProducts(ev?){
    const query = await this.productsManagementService.getProducts(true);
    query.subscribe(data => {
      this.products = data.products;
      if(ev){
        ev.target.complete();
      }
    });
  }

  async changeStatusProduct(product: Product) {
    let newProduct:Product=await this.productsManagementService.updateProduct(product);
    console.log(newProduct);
    const index = this.products.indexOf(product);
    if(product.available!== newProduct.available)
    this.products[index]=newProduct;
  }

  async newProduct(){
    console.log('oe');
    
    const modal = await this.modalController.create({
      component:NewProductComponent
 
    });
    modal.present();
  }

}
