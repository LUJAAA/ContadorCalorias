import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'carga',
    loadChildren: () => import('./paginas/carga/carga.module').then( m => m.CargaPageModule)
  },
  {
    path: 'configurar-dieta',
    loadChildren: () => import('./paginas/configurar-dieta/configurar-dieta.module').then( m => m.ConfigurarDietaPageModule)
  },
  {
    path: 'seleccion-alimentos',
    loadChildren: () => import('./paginas/seleccion-alimentos/seleccion-alimentos.module').then( m => m.SeleccionAlimentosPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./paginas/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'historial-dietas',
    loadChildren: () => import('./paginas/historial-dietas/historial-dietas.module').then( m => m.HistorialDietasPageModule)
  },
  {
    path: 'historial-alimentos',
    loadChildren: () => import('./paginas/historial-alimentos/historial-alimentos.module').then( m => m.HistorialAlimentosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
