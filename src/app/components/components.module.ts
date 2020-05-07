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
    PopoverChangeRangeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],exports:[
    SlideshowProductComponent,
    ProductAvailableComponent,
    SlideshowCartComponent,
    NavbarComponent,
    ItemProductOrderComponent,
    ItemOrderComponent,
    ItemUserComponent
  ]
})
export class ComponentsModule { }
