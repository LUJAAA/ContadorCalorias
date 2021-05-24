import { Component, OnInit } from '@angular/core';
// importaciones para sqlite //
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
///-------------------------------------//
import { DbService } from '../../services/db.service';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-historial-dietas',
  templateUrl: './historial-dietas.page.html',
  styleUrls: ['./historial-dietas.page.scss'],
})
export class HistorialDietasPage implements OnInit {

  // fotos
  public photo: Photo[] = [];
  photos: Photo[];
  // sqlite
  mainForm: FormGroup;
  Data: any[] = []
  //----//
  ver: boolean = false;
  ver1: boolean = true;
  pantalla: number = 0;
  ruta: string = "";
  // variables para la parte de mostrar los datos //

  c_desayuno: boolean = false;
  c_marienda: boolean = false;
  c_comida: boolean = false;
  c_entrecomida: boolean = false;
  c_cena: boolean = false;
  // ----------------------------------------------//
  l_deyauno: Array<any> = [];
  l_meridenda: Array<any> = [];
  l_comida: Array<any> = [];
  l_entrecomida: Array<any> = [];
  l_cena: Array<any> = [];
  l_nombres_dietas: Array<any> = [];
  longitud_de_base_datos: number = 0;
  dieta: String = "";
  calo: Number = 0;
  t_por_dieta: Array<any> = [];
  regresover: boolean = true;
  regresover2: boolean = false;
  constructor(public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private db: DbService,
    private photoSvc: PhotoService) {

  }

  ngOnInit() {
    // fotos 
    this.photoSvc.loadSaved().then(() => {
      this.photos = this.photoSvc.getPhotos();
    });
    // aqui se muestran los datos 
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchSongs().subscribe(item => {// fech
          this.Data = item
        })
      }
    });

    this.mainForm = this.formBuilder.group({
      nombre_dieta: [''],
      calorias_total: [''],
      comida: [''],
      alimentoNombre: [''],
      calorias: [''],
      cantidad: [''],
      fecha: ['']
    })

  }

  ionViewDidEnter() {
    this.obtenerNombresCaloriasTotales();
    console.log("XDDDD");
  }

  totalDietasCreadas: number = 0;
  numeroDietaActual: number = 0;
  nombresDietas: String[] = [];
  cantidadCalorias: number[] = [];
  fechaCreacion: String[] = [];

  public newPhoto(): void {
    this.photoSvc.addNewToGallery()
  }
  deleteTask(index) {
    this.photos.splice(index, 1);

  }

  Izquierda() {
    if (this.numeroDietaActual <= 0)
      this.numeroDietaActual = this.totalDietasCreadas;
    else
      this.numeroDietaActual--;
  }

  Derecha() {
    if (this.numeroDietaActual >= this.totalDietasCreadas)
      this.numeroDietaActual = 0;
    else
      this.numeroDietaActual++;
  }

  obtenerNombresCaloriasTotales() {
    var x: number = 0;

    // **PONER UNA VALIDADACION POR SI NO EXISTE NINGUNA DIETA ** //
    // Obtenemos la longitud
    this.longitud_de_base_datos = this.Data.length;
    // incializamos el detector de dietas
    this.nombresDietas = [];
    this.cantidadCalorias = [];
    this.fechaCreacion = [];
    var nombre_dieta_uno: string = "";
    nombre_dieta_uno = this.Data[0].nombre_dieta;
    console.log("NombreDieta=" + nombre_dieta_uno);
    this.nombresDietas.push(this.Data[0].nombre_dieta);
    this.cantidadCalorias.push(this.Data[0].calorias_total);
    this.fechaCreacion.push(this.Data[0].fecha);
    for (x = 0; x < this.longitud_de_base_datos; x++) {
      if (nombre_dieta_uno != this.Data[x].nombre_dieta) {
        nombre_dieta_uno = this.Data[x].nombre_dieta;
        this.nombresDietas.push(this.Data[x].nombre_dieta);
        this.cantidadCalorias.push(this.Data[x].calorias_total);
        this.fechaCreacion.push(this.Data[x].fecha);
      }
    }
    // obtenemos la cantidad de dietas
    // el menos uno es porque la final se guarda basura
    this.totalDietasCreadas = 0;
    this.totalDietasCreadas = this.nombresDietas.length - 1;


  }

  mostrar() {
    // ** impirtante reiniciar todos los datos porque se dublican al final cadfa vez que se ejecutya este metodo **//
    this.t_por_dieta[0] = 0;
    this.t_por_dieta[1] = 0;
    this.t_por_dieta[2] = 0;
    this.t_por_dieta[3] = 0;
    this.t_por_dieta[4] = 0;
    this.c_desayuno = this.c_marienda = this.c_comida = this.c_entrecomida = this.c_cena = false;
    this.l_deyauno = [];
    this.l_entrecomida = [];
    this.l_meridenda = [];
    this.l_cena = [];
    this.l_comida = [];

    var i: number;
    var f = 0;
    // mostrar
    this.dieta = this.nombresDietas[this.numeroDietaActual];
    this.calo = this.cantidadCalorias[this.numeroDietaActual];

    // vemos la longitud de la lista donde se almacenan todos lo datos de las dietas
    var longitud: number;
    longitud = this.Data.length;
    console.log("long: " + longitud);
    // detecto las comida que se hicieron
    for (i = 0; i < longitud; i++) {
      if (this.Data[i].comida == "Desayuno" && this.nombresDietas[this.numeroDietaActual] == this.Data[i].nombre_dieta)
        this.c_desayuno = true;
      if (this.Data[i].comida == "Merienda" && this.nombresDietas[this.numeroDietaActual] == this.Data[i].nombre_dieta)
        this.c_marienda = true;
      if (this.Data[i].comida == "Comida" && this.nombresDietas[this.numeroDietaActual] == this.Data[i].nombre_dieta)
        this.c_comida = true;
      if (this.Data[i].comida == "Entrecomida" && this.nombresDietas[this.numeroDietaActual] == this.Data[i].nombre_dieta)
        this.c_entrecomida = true;
      if (this.Data[i].comida == "Cena" && this.nombresDietas[this.numeroDietaActual] == this.Data[i].nombre_dieta)
        this.c_cena = true;
    }

    // ingreso los alimentos de cada comida
    f = 0;
    if (this.c_desayuno == true) {
      for (f = 0; f < longitud; f++) {
        if (this.Data[f].comida == "Desayuno" && this.nombresDietas[this.numeroDietaActual] == this.Data[f].nombre_dieta) {
          this.l_deyauno.push({
            nombre: this.Data[f].alimentoNombre,
            calorias: this.Data[f].calorias,
            cantidad: this.Data[f].cantidad
          });
          this.t_por_dieta[0] = parseInt(this.t_por_dieta[0]) + parseInt(this.Data[f].calorias);
        }
      }
    }
    f = 0;
    if (this.c_marienda == true) {
      for (f = 0; f < longitud; f++) {
        if (this.Data[f].comida == "Merienda" && this.nombresDietas[this.numeroDietaActual] == this.Data[f].nombre_dieta) {
          this.l_meridenda.push({
            nombre: this.Data[f].alimentoNombre,
            calorias: this.Data[f].calorias,
            cantidad: this.Data[f].cantidad
          });

          this.t_por_dieta[1] = parseInt(this.t_por_dieta[1]) + parseInt(this.Data[f].calorias);
        }
      }
    }
    if (this.c_comida == true) {
      for (f = 0; f < longitud; f++) {
        if (this.Data[f].comida == "Comida" && this.nombresDietas[this.numeroDietaActual] == this.Data[f].nombre_dieta) {
          this.l_comida.push({
            nombre: this.Data[f].alimentoNombre,
            calorias: this.Data[f].calorias,
            cantidad: this.Data[f].cantidad
          });
          this.t_por_dieta[2] = parseInt(this.t_por_dieta[2]) + parseInt(this.Data[f].calorias);
        }
      }
    }
    if (this.c_entrecomida == true) {
      for (f = 0; f < longitud; f++) {
        if (this.Data[f].comida == "Entrecomida" && this.nombresDietas[this.numeroDietaActual] == this.Data[f].nombre_dieta) {
          this.l_entrecomida.push({
            nombre: this.Data[f].alimentoNombre,
            calorias: this.Data[f].calorias,
            cantidad: this.Data[f].cantidad
          });
          this.t_por_dieta[3] = parseInt(this.t_por_dieta[3]) + parseInt(this.Data[f].calorias);
        }
      }
    }
    if (this.c_cena == true) {
      for (f = 0; f < longitud; f++) {
        if (this.Data[f].comida == "Cena" && this.nombresDietas[this.numeroDietaActual] == this.Data[f].nombre_dieta) {
          this.l_cena.push({
            nombre: this.Data[f].alimentoNombre,
            calorias: this.Data[f].calorias,
            cantidad: this.Data[f].cantidad
          });
          this.t_por_dieta[4] = parseInt(this.t_por_dieta[4]) + parseInt(this.Data[f].calorias);
        }
      }
    }
    this.verdeadeveras();
    this.pantalla = 1;
    this.ruta = '/historial-dietas';
  }
  // Se muestra los alimentos de todas las comidas sin importar la dieta
  // de momento solo refleja que se guardan los datos
  // aun esta desordenado
  cargarInfo() {
    var i: number;
    var f: number;
    var com: number;
    // vemos la longitud de la lista donde se almacenan todos lo datos de las dietas
    var longitud: number;
    longitud = this.Data.length;
    console.log("long: " + longitud);
    // detecto las comida que se hicieron
    for (i = 0; i < longitud; i++) {
      if (this.Data[i].comida = "Desayuno")
        this.c_desayuno = true;
      if (this.Data[i].comida = "Merienda")
        this.c_marienda = true;
      if (this.Data[i].comida = "Comida")
        this.c_comida = true;
      if (this.Data[i].comida = "Entrecomida")
        this.c_entrecomida = true;
      if (this.Data[i].comida = "Cena")
        this.c_cena = true;
    }
    // ingreso los alimentos de cada comida
    f = 0;
    if (this.c_desayuno = true) {
      console.log("DESAYUNO");
      for (f = 0; f < longitud; f++) {

        if (this.Data[f].comida = "Desayuno") {
          this.l_deyauno.push({
            nombre: this.Data[f].alimentoNombre,
            calorias: this.Data[f].calorias,
            cantidad: this.Data[f].cantidad
          });

          console.log("Alimento:" + this.Data[f].alimentoNombre);
          console.log("Calorias:" + this.Data[f].calorias);
          console.log("Cantidad:" + this.Data[f].cantidad);
        }

      }
    }
    f = 0;
    if (this.c_marienda = true) {
      console.log("MERIENDA");
      for (f = 0; f < longitud; f++) {

        if (this.Data[f].comida = "Merienda") {
          this.l_meridenda.push({
            alimentoNombre: this.Data[f].alimentoNombre,
            calorias: this.Data[f].calorias,
            cantidad: this.Data[f].cantidad
          });

          console.log("Alimento:" + this.Data[f].alimentoNombre);
          console.log("Calorias:" + this.Data[f].calorias);
          console.log("Cantidad:" + this.Data[f].cantidad);
        }
      }
    }
    if (this.c_comida = true) {
      console.log("COMIDA");
      for (f = 0; f < longitud; f++) {

        if (this.Data[f].comida = "Comida") {
          console.log("Alimento:" + this.Data[f].alimentoNombre);
          console.log("Calorias:" + this.Data[f].calorias);
          console.log("Cantidad:" + this.Data[f].cantidad);
        }
      }
    }
    if (this.c_entrecomida = true) {
      console.log("ENTRECOMIDA");
      for (f = 0; f < longitud; f++) {

        if (this.Data[f].comida = "Entrecomida") {
          console.log("Alimento:" + this.Data[f].alimentoNombre);
          console.log("Calorias:" + this.Data[f].calorias);
          console.log("Cantidad:" + this.Data[f].cantidad);
        }
      }
    }
    if (this.c_cena = true) {
      console.log("CENA");
      for (f = 0; f < longitud; f++) {

        if (this.Data[f].comida = "Cena") {
          console.log("Alimento:" + this.Data[f].alimentoNombre);
          console.log("Calorias:" + this.Data[f].calorias);
          console.log("Cantidad:" + this.Data[f].cantidad);
        }
      }
    }

  }

  verdeadeveras() {
    this.ver = true;
    this.ver1 = false;
    this.regresover = false;
    this.regresover2 = true;
  }

  controlPantalla() {
    if (this.pantalla == 1) {
      this.ver = false;
      this.ver1 = true;
      this.regresover = true;
      this.regresover2 = false;
    }
  }
}
