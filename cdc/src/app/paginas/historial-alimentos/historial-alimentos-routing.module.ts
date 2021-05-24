import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialAlimentosPage } from './historial-alimentos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialAlimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialAlimentosPageRoutingModule {}
