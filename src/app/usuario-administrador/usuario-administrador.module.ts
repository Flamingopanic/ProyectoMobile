import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioAdministradorPageRoutingModule } from './usuario-administrador-routing.module';

import { UsuarioAdministradorPage } from './usuario-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioAdministradorPageRoutingModule
  ],
  declarations: [UsuarioAdministradorPage]
})
export class UsuarioAdministradorPageModule {}
