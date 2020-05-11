import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../interfaces/ProductInterfaces';
import { CartService } from '../../../services/cart.service';
import { AlertController } from '@ionic/angular';

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

  @Input() product:Product;
  constructor(private cartService:CartService,
    private alertCtrl:AlertController) { }

  ngOnInit() {}

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
            if (data.quantity != "" && Number(data.amount) >= 1) {
              this.cartService.addProduct(this.product, Number(data.amount));
            }
          }
        }
      ]
    });
    alert.present();
  }

}


