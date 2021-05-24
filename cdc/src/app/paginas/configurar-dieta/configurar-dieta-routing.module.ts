import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurarDietaPage } from './configurar-dieta.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurarDietaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurarDietaPageRoutingModule {}
