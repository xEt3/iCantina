import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ProductAvailableComponent } from './products-components/card-product-available/card-product-available.component';
import { ProductOrderComponent } from './cart-components/product-order/product-order.component';
import { NewProductComponent } from './products-components/new-product/new-product.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { ItemProductOrderComponent } from './cart-components/item-product-order/item-product-order.component';
import { ItemUserComponent } from './users-components/item-user/item-user.component';
import { PopoverChangeRangeComponent } from './users-components/popover-change-range/popover-change-range.component';
import { FormsModule } from '@angular/forms';
import { ItemProductsComponent } from './orders-components/items-card-order/item-products/item-products.component';
import { ItemDeliveryDataComponent } from './orders-components/items-card-order/item-delivery-data/item-delivery-data.component';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../../environments/environment.prod';

import { ChipUserComponent } from './users-components/chip-user/chip-user.component';
import { SlideshowProductComponent } from './products-components/slideshow-product/slideshow-product.component';
import { SlideshowCartComponent } from './cart-components/slideshow-cart/slideshow-cart.component';
import { CardOrderClientComponent } from './orders-components/card-order-client/card-order-client.component';
import { GridOrdersEditableComponent } from './orders-components/grid-orders-editable/grid-orders-editable.component';
import { CardOrderEditableComponent } from './orders-components/card-order-editable/card-order-editable.component';
import { ItemProductEditableComponent } from './products-components/item-product-editable/item-product-editable.component';
import { EditProductComponent } from './products-components/edit-product/edit-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';



@NgModule({
  entryComponents:[PopoverChangeRangeComponent,EditProductComponent],
  declarations: [SlideshowProductComponent,
    ProductAvailableComponent,
    SlideshowCartComponent,
    ProductOrderComponent,
    NavbarComponent,
    ItemProductOrderComponent,
    CardOrderClientComponent,
    ItemUserComponent,
    PopoverChangeRangeComponent,
    GridOrdersEditableComponent,
    CardOrderEditableComponent,
    ItemProductsComponent,
    ItemDeliveryDataComponent,
    ChipUserComponent,
    ItemProductEditableComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],exports:[
    SlideshowProductComponent,
    ProductAvailableComponent,
    SlideshowCartComponent,
    NavbarComponent,
    ItemProductOrderComponent,
    CardOrderClientComponent,
    ItemUserComponent,
    GridOrdersEditableComponent,
    CardOrderEditableComponent,
    ItemProductEditableComponent
  
  ]
})
export class ComponentsModule { }
