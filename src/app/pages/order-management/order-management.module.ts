import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderManagementPageRoutingModule } from './order-management-routing.module';

import { OrderManagementPage } from './order-management.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderManagementPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OrderManagementPage]
})
export class OrderManagementPageModule {}
