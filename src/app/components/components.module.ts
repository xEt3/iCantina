import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowProductComponent } from './slideshow-product/slideshow-product.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ProductAvailableComponent } from './product-available/product-available.component';
import { SlideshowCartComponent } from './slideshow-cart/slideshow-cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';



@NgModule({
  declarations: [SlideshowProductComponent,ProductAvailableComponent,SlideshowCartComponent,ProductOrderComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],exports:[SlideshowProductComponent,ProductAvailableComponent,SlideshowCartComponent]
})
export class ComponentsModule { }
