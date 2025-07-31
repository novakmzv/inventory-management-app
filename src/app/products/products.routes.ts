import { Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';

export const productsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListProductsComponent },
];
