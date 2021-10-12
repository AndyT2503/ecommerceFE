import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
  // { path: 'PageNotFound', component: PageNotFoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: "reload",
    scrollPositionRestoration: "top",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
