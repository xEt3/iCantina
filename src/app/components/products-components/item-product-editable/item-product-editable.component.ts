import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../interfaces/ProductInterfaces';
import { ProductsManagementService } from '../../../services/products-management.service';
import { ModalController } from '@ionic/angular';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-item-product-editable',
  templateUrl: './item-product-editable.component.html',
  styleUrls: ['./item-product-editable.component.scss'],
})
export class ItemProductEditableComponent implements OnInit {

  @Input() product:Product;

  constructor(
    private productsManagementService:ProductsManagementService,
    private modalController:ModalController
    ) { }

  ngOnInit() {}

  async deleteProduct(product:Product){
    await this.productsManagementService.deleteProduct(product._id)
  }

  async changeStatusProduct(product: Product) {
    await this.productsManagementService.updateProduct(product);
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
