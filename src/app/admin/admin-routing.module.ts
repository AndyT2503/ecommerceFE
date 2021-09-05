import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'supplier',
        loadChildren: () => import('./modules/supplier/supplier.module').then((m) => m.SupplierModule)
      },
      {
        path: 'product-type',
        loadChildren: () => import('./modules/product-type/product-type.module').then((m) => m.ProductTypeModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'supplier'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
