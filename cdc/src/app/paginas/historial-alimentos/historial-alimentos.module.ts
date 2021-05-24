import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialAlimentosPageRoutingModule } from './historial-alimentos-routing.module';

import { HistorialAlimentosPage } from './historial-alimentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialAlimentosPageRoutingModule
  ],
  declarations: [HistorialAlimentosPage]
})
export class HistorialAlimentosPageModule {}
