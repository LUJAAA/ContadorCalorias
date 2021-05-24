import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionAlimentosPage } from './seleccion-alimentos.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionAlimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionAlimentosPageRoutingModule {}
