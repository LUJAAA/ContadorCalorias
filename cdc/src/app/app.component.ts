import { Component } from '@angular/core';
import { AlimentoService } from './Servicios/alimento.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alimentoService: AlimentoService) { }

  // Peticiones para obtener una comida //
  /*ObtenerUnAlimento()
  {
    this.alimentoService.ObtenerUnAlimento().subscribe(alimentos => { console.log(alimentos)});
  }*/
}
