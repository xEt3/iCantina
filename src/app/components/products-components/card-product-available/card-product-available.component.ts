import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../interfaces/ProductInterfaces';
import { CartService } from '../../../services/cart.service';
import { AlertController } from '@ionic/angular';
import { TempImage } from '../../../interfaces/interfaces';
import { TempImagesService } from '../../../temp-images.service';
import { AppModule } from '../../../app.module';
import { UIService } from '../../../services/ui.service';

@Component({
  selector: 'app-card-product-available',
  templateUrl: './card-product-available.component.html',
  styleUrls: ['./card-product-available.component.scss'],
})
export class ProductAvailableComponent implements OnInit {

  slideSoloOpt = {
    allowSlideNext: false,
    allowSlidePrev: false
  }
  @Input() disabled=false;
  @Input() product:Product;
  @Input() newProduct:boolean=false;
  constructor(private cartService:CartService,
    private alertCtrl:AlertController,
    public tempImagesService:TempImagesService,
    private uiService:UIService) { }

  ngOnInit() {
    console.log(this.tempImagesService.tempImages);
    
  }

  async addProductToCart() {
    const alert = await this.alertCtrl.create({
      header: 'Cantidad',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'cantidad',
          value:1
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Add to cart',
          handler: (data) => {
            if (data.quantity != "" && Number(data.amount) >= 1 && Number(data.amount)<100) {
              this.cartService.addProduct(this.product, Number(data.amount));
            }else{
              this.uiService.presentToast('Cantidad invalida','danger');
            }
          }
        }
      ]
    });
    alert.present();
  }

}


