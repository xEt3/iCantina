import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsManagementPage } from './products-management.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsManagementPageRoutingModule {}
