import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderManagementPage } from './order-management.page';

const routes: Routes = [
  {
    path: '',
    component: OrderManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderManagementPageRoutingModule {}
