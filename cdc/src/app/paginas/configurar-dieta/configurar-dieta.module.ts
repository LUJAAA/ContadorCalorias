import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurarDietaPageRoutingModule } from './configurar-dieta-routing.module';

import { ConfigurarDietaPage } from './configurar-dieta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurarDietaPageRoutingModule
  ],
  declarations: [ConfigurarDietaPage]
})
export class ConfigurarDietaPageModule {}
