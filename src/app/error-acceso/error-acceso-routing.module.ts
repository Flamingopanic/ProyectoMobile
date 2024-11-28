import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorAccesoPage } from './error-acceso.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorAccesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorAccesoPageRoutingModule {}
