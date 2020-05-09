import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'products-management',
    loadChildren: () => import('./pages/products-management/products-management.module').then( m => m.ProductsManagementPageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'user-management',
    loadChildren: () => import('./pages/user-management/user-management.module').then( m => m.UserManagementPageModule)
  },
  {
    path: 'order-management',
    loadChildren: () => import('./pages/order-management/order-management.module').then( m => m.OrderManagementPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
