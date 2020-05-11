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
  infineScrollEnable=true;

  constructor(private productsManagementService: ProductsManagementService,
    private modalController:ModalController,
    ) { }

  async ngOnInit() {
    await this.nexts(null,true);
    this.productsManagementService.changeProduct.subscribe(data=>{
      this.nexts(null,true);
    })
  }

  refresh(ev){
    this.nexts(ev,true);
  }

  async deleteProduct(product:Product){
    await this.productsManagementService.deleteProduct(product._id)
  }

  async nexts(ev?,reset:boolean=false){
    if(reset){
      this.products=[];
      this.infineScrollEnable=true;
    }
    const query = await this.productsManagementService.getProducts(reset);
    query.subscribe(data => {
      this.products.push(...data.products);
      if(data.products.length===0){
        this.infineScrollEnable=false;
      }
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
    const modal = await this.modalController.create({
      component:NewProductComponent
 
    });
    modal.present();
  }

  async editProduct(product:Product){
    const modal = await this.modalController.create({
      component:EditProductComponent,
      componentProps:{
        product
      }
    });
    modal.present();
  }

}
