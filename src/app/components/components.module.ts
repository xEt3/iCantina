import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowProductComponent } from './slideshow-product/slideshow-product.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ProductAvailableComponent } from './product-available/product-available.component';
import { SlideshowCartComponent } from './slideshow-cart/slideshow-cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemProductOrderComponent } from './item-product-order/item-product-order.component';
import { SendOrderComponent } from './send-order/send-order.component';
import { ItemOrderComponent } from './item-order/item-order.component';
import { ItemUserComponent } from './item-user/item-user.component';
import { PopoverChangeRangeComponent } from './popover-change-range/popover-change-range.component';
import { OrdersConfigurableComponent } from './orders-configurable/orders-configurable.component';
import { OrderEditableComponent } from './order-editable/order-editable.component';
import { FormsModule } from '@angular/forms';
import { ItemProductsComponent } from './items/item-products/item-products.component';
import { ItemDeliveryDataComponent } from './items/item-delivery-data/item-delivery-data.component';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../../environments/environment.prod';
import { ChipUserComponent } from '../chip-user/chip-user.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  entryComponents:[PopoverChangeRangeComponent],
  declarations: [SlideshowProductComponent,
    ProductAvailableComponent,
    SlideshowCartComponent,
    ProductOrderComponent,
    NavbarComponent,
    ItemProductOrderComponent,
    ItemOrderComponent,
    ItemUserComponent,
    PopoverChangeRangeComponent,
    OrdersConfigurableComponent,
    OrderEditableComponent,
    ItemProductsComponent,
    ItemDeliveryDataComponent,
    ChipUserComponent,
    ProductComponent
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
    ItemOrderComponent,
    ItemUserComponent,
    OrdersConfigurableComponent,
    OrderEditableComponent,
  
  ]
})
export class ComponentsModule { }
