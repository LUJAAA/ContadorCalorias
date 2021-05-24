import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../../Servicios/alimento.service';// importo el servico

import { Alimentos } from '../../interfaces/alimento';// importo la interface
//import { promise } from 'selenium-webdriver';

// importo el servicio que comunica las paginas de configuracion de alimentos y la de seleccionar el alimento

import { AlimentosEscogerService } from '../../Servicios/alimentos-escoger.service';
@Component({
  selector: 'app-seleccion-alimentos',
  templateUrl: './seleccion-alimentos.page.html',
  styleUrls: ['./seleccion-alimentos.page.scss'],
})
  
export class SeleccionAlimentosPage implements OnInit {

  // contiene el texto del buscador de selecciondealimentos.page.html debe llamarse igual
  alimentoABuscar: string;
  alimentoSelec: string;
  comidas: any[];
  xdd: string;
  constructor(private alimentoservices: AlimentoService, private selAli: AlimentosEscogerService) { }

  ngOnInit() { console.log(this.xdd) }

 
  // le pongo el mismo nombre que la funcion del servicio
  
  // Si estas escogiendo alimentos en "DESAYUNO" al agregarlo se desplegara en la lista de "DESAYUNO" de la pagina anterior 
 

}
