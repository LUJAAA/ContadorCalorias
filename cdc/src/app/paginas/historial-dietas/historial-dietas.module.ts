import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialDietasPageRoutingModule } from './historial-dietas-routing.module';

import { HistorialDietasPage } from './historial-dietas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialDietasPageRoutingModule
  ],
  declarations: [HistorialDietasPage]
})
export class HistorialDietasPageModule {}
