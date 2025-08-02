import {Routes} from '@angular/router';
import {ListBatchesComponent} from '.';

export const batchesRoutes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListBatchesComponent},
];
