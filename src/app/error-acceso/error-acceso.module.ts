import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorAccesoPageRoutingModule } from './error-acceso-routing.module';

import { ErrorAccesoPage } from './error-acceso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorAccesoPageRoutingModule
  ],
  declarations: [ErrorAccesoPage]
})
export class ErrorAccesoPageModule {}
