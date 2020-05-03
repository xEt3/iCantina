import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowProductComponent } from './slideshow-product/slideshow-product.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ProductAvailableComponent } from './product-available/product-available.component';



@NgModule({
  declarations: [SlideshowProductComponent,ProductAvailableComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],exports:[SlideshowProductComponent,ProductAvailableComponent]
})
export class ComponentsModule { }
