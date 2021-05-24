import { HttpClient } from '@angular/common/http'; // para poder hacer peticiones 
import { Injectable } from '@angular/core';
import { Alimentos } from '../interfaces/alimento'; // Importamos la interfas


@Injectable({
  providedIn: 'root'
})
  
  
export class AlimentoService {

  // agregamos private http: HttpClient
  constructor(private http: HttpClient) { }

  // Al llama a la api, lo unico que cambiamos es la comida a buscar
  ObtenerUnAlimento(alimentobuscado: string) {
    return this.http.get('https://api.edamam.com/api/food-database/v2/parser?ingr=' + alimentobuscado + '&app_id=b8924325&app_key=9af0ffb5020e4c80e2158ccf6fdcc535');
  }

 
  // intento //
  pahtEdenam: string = 'https://api.edamam.com/api/food-database/v2/parser?ingr=apple&app_id=b8924325&app_key=9af0ffb5020e4c80e2158ccf6fdcc535';

  aliCargar()
  {
    return this.http
      .get(this.pahtEdenam)
  }
}
