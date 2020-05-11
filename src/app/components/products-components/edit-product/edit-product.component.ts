import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../interfaces/ProductInterfaces';
import { ModalController } from '@ionic/angular';
import { ProductsManagementService } from '../../../services/products-management.service';
import { UIService } from '../../../services/ui.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  @Input() product: Product;

  constructor(private modalController:ModalController,
    private productsManagementService:ProductsManagementService,
    private ui:UIService
    ) { }

  ngOnInit() {
   }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  saveChanges(){
    this.productsManagementService.updateProduct(this.product).then(data=>{
      if(data){
        this.productsManagementService.changeProduct.emit();
        this.ui.presentToast("Cambios guardados correctamente")
        this.modalController.dismiss({
          'dismissed': true
        });
      }
    })
  }

  async deleteProduct(){
    await this.productsManagementService.deleteProduct(this.product._id);
    this.dismiss();
  }

}
