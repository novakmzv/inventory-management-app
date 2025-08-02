import {Routes} from '@angular/router';
import {ListProductsComponent, CreateProductComponent} from '.';

export const productsRoutes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListProductsComponent},
  {path: 'create', component: CreateProductComponent},
];
