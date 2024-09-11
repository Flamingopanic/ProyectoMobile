import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarcontraPageRoutingModule } from './recuperarcontra-routing.module';

import { RecuperarcontraPage } from './recuperarcontra.page';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarcontraPageRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [RecuperarcontraPage, HeaderComponent]
})
export class RecuperarcontraPageModule {}
