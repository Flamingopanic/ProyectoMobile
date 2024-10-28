import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioAdministradorPage } from './usuario-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioAdministradorPageRoutingModule {}
