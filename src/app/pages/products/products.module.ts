import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ComponentsModule } from '../../components/components.module';
import { SendOrderComponent } from '../../components/orders-components/send-order/send-order.component';

@NgModule({
  entryComponents:[SendOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductsPage,SendOrderComponent]
})
export class ProductsPageModule {}
