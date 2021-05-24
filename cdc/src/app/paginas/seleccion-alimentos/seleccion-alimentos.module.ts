import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionAlimentosPageRoutingModule } from './seleccion-alimentos-routing.module';

import { SeleccionAlimentosPage } from './seleccion-alimentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionAlimentosPageRoutingModule
  ],
  declarations: [SeleccionAlimentosPage]
})
export class SeleccionAlimentosPageModule {}
