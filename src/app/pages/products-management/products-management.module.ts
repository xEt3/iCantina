import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsManagementPageRoutingModule } from './products-management-routing.module';

import { ProductsManagementPage } from './products-management.page';
import { ImagePipe } from '../../pipes/image.pipe';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { NewProductComponent } from '../../components/new-product/new-product.component';

@NgModule({
  entryComponents:[NewProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsManagementPageRoutingModule,
    PipesModule
  ],
  declarations: [ProductsManagementPage,NewProductComponent]
})
export class ProductsManagementPageModule {}
