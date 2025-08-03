import {Routes} from '@angular/router';
import {CreateBatchComponent, ListBatchesComponent} from '.';

export const batchesRoutes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListBatchesComponent},
  { path: 'create', component: CreateBatchComponent },
];
