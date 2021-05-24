import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialDietasPage } from './historial-dietas.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialDietasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialDietasPageRoutingModule {}
