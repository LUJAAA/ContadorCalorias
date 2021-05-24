import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../../Servicios/alimento.service';
import { Alimentos } from '../../interfaces/alimento';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-historial-alimentos',
  templateUrl: './historial-alimentos.page.html',
  styleUrls: ['./historial-alimentos.page.scss'],
})
export class HistorialAlimentosPage implements OnInit {

  alimentos: Alimentos[] = [];
  // sqlite
  mainForm: FormGroup;
  Data: any[] = [];
  x: number = 0;
  i: number = 0;
  k: number = 0;
  periodoTiempo: string[] = ["SEMANAL", "MENSUAL", "ANUAL", "GLOBAL"];
  l_alimentos: Array<any> = [];
  totalPorLista: any = 0;
  alimentosSemanalPrueba: string[] = [];
  detectarRepetidos: Array<any> = [];
  logitudr: number = 0;
  repetido: boolean;
  longituddddd: number = 0;
  constructor(private alimentoservices: AlimentoService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private db: DbService,
  ) { }

  ngOnInit() {
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

    this.mostrarTablaAlimentos();
  }

  mostrarTablaAlimentos() {
    var longitud: number = 0;
    var ii: number = 0;
    var x: number = 0;
    longitud = this.Data.length;
    var fechahaceunasemana = new Date();
    var fechahaceunmes = new Date();
    var fechacomparar = new Date();
    var fechahaceunaño = new Date();
    fechahaceunasemana.setDate(fechahaceunasemana.getDate() - 7);
    fechahaceunmes.setDate(fechahaceunmes.getDate() - 31);
    fechahaceunaño.setDate(fechahaceunaño.getDate() - 365);
    this.detectarRepetidos = [];
    this.totalPorLista = 0;
    // ** los alimentos se repiten ** //
    if (this.i == 3)// global
    {
      this.totalPorLista = 0;
      this.l_alimentos = [];
      // detecto todos los alimentos 
      this.longituddddd = this.Data.length;
      this.detectarRepetidos.push(this.Data[0].alimentoNombre);

      for (x = 0; x < this.longituddddd; x++) {

        this.logitudr = this.detectarRepetidos.length;
        for (this.k = 0; this.k < this.logitudr; this.k++) {
          if (this.Data[x].alimentoNombre == this.detectarRepetidos[this.k]) {
            this.repetido = true;
          }
        }
        if (this.repetido == false) {
          this.detectarRepetidos.push(this.Data[x].alimentoNombre);
        }
        this.repetido = false;
      }
      this.logitudr = this.detectarRepetidos.length;
      var sumacal: any = 0;
      var sumcant: any = 0;
      for (x = 0; x < this.logitudr; x++) {
        for (this.k = 0; this.k < this.longituddddd; this.k++) {
          if (this.detectarRepetidos[x] == this.Data[this.k].alimentoNombre) {
            sumacal = parseInt(sumacal) + parseInt(this.Data[this.k].calorias);
            sumcant = parseInt(sumcant) + parseInt(this.Data[this.k].cantidad);
          }
        }
        this.l_alimentos.push({
          nombre: this.detectarRepetidos[x],
          cantidad: sumcant,
          calorias: sumacal
        });
        sumacal = 0;
        sumcant = 0;
      }
      this.totalPorLista = 0;
      for (ii = 0; ii < longitud; ii++) {
        this.totalPorLista = parseInt(this.totalPorLista) + parseInt(this.Data[ii].calorias);
      }
    }
    else if (this.i == 0) {// semanal
      this.totalPorLista = 0;
      this.l_alimentos = [];

      // detecto todos los alimentos ////////////////////////////////
      this.longituddddd = this.Data.length;
      this.detectarRepetidos.push(this.Data[0].alimentoNombre);

      for (x = 0; x < this.longituddddd; x++) {
        var xd = Date.parse(this.Data[x].fecha);
        var f = new Date(xd);
        if (f >= fechahaceunasemana) {
          this.logitudr = this.detectarRepetidos.length;
          for (this.k = 0; this.k < this.logitudr; this.k++) {
            if (this.Data[x].alimentoNombre == this.detectarRepetidos[this.k]) {
              this.repetido = true;
            }
          }
          if (this.repetido == false) {
            this.detectarRepetidos.push(this.Data[x].alimentoNombre);
          }
          this.repetido = false;
        }

      }
      this.logitudr = this.detectarRepetidos.length;
      var sumacal: any = 0;
      var sumcant: any = 0;
      for (x = 0; x < this.logitudr; x++) {
        for (this.k = 0; this.k < this.longituddddd; this.k++) {
          if (this.detectarRepetidos[x] == this.Data[this.k].alimentoNombre) {
            sumacal = parseInt(sumacal) + parseInt(this.Data[this.k].calorias);
            sumcant = parseInt(sumcant) + parseInt(this.Data[this.k].cantidad);
          }
        }
        this.l_alimentos.push({
          nombre: this.detectarRepetidos[x],
          cantidad: sumcant,
          calorias: sumacal
        });
        sumacal = 0;
        sumcant = 0;
      }
      this.totalPorLista = 0;
      for (ii = 0; ii < longitud; ii++) {
        var xd = Date.parse(this.Data[ii].fecha);
        var f = new Date(xd);
        if (f >= fechahaceunasemana) {
          this.totalPorLista = parseInt(this.totalPorLista) + parseInt(this.Data[ii].calorias);
        }
      }
      ////////////////////////////////////////////////////////


    }
    else if (this.i == 1) {// mensual
      this.totalPorLista = 0;
      this.l_alimentos = [];
      // detecto todos los alimentos ////////////////////////////////
      this.longituddddd = this.Data.length;
      this.detectarRepetidos.push(this.Data[0].alimentoNombre);

      for (x = 0; x < this.longituddddd; x++) {
        var xd = Date.parse(this.Data[x].fecha);
        var f = new Date(xd);
        if (f >= fechahaceunmes) {
          this.logitudr = this.detectarRepetidos.length;
          for (this.k = 0; this.k < this.logitudr; this.k++) {
            if (this.Data[x].alimentoNombre == this.detectarRepetidos[this.k]) {
              this.repetido = true;
            }
          }
          if (this.repetido == false) {
            this.detectarRepetidos.push(this.Data[x].alimentoNombre);
          }
          this.repetido = false;
        }

      }
      this.logitudr = this.detectarRepetidos.length;
      var sumacal: any = 0;
      var sumcant: any = 0;
      for (x = 0; x < this.logitudr; x++) {
        for (this.k = 0; this.k < this.longituddddd; this.k++) {
          if (this.detectarRepetidos[x] == this.Data[this.k].alimentoNombre) {
            sumacal = parseInt(sumacal) + parseInt(this.Data[this.k].calorias);
            sumcant = parseInt(sumcant) + parseInt(this.Data[this.k].cantidad);
          }
        }
        this.l_alimentos.push({
          nombre: this.detectarRepetidos[x],
          cantidad: sumcant,
          calorias: sumacal
        });
        sumacal = 0;
        sumcant = 0;
      }
      this.totalPorLista = 0;
      for (ii = 0; ii < longitud; ii++) {
        var xd = Date.parse(this.Data[ii].fecha);
        var f = new Date(xd);
        if (f >= fechahaceunmes) {
          this.totalPorLista = parseInt(this.totalPorLista) + parseInt(this.Data[ii].calorias);
        }
      }
    }
    else if (this.i == 2) {// anual
      this.totalPorLista = 0;
      this.l_alimentos = [];
      // detecto todos los alimentos ////////////////////////////////
      this.longituddddd = this.Data.length;
      this.detectarRepetidos.push(this.Data[0].alimentoNombre);

      for (x = 0; x < this.longituddddd; x++) {
        var xd = Date.parse(this.Data[x].fecha);
        var f = new Date(xd);
        if (f >= fechahaceunaño) {
          this.logitudr = this.detectarRepetidos.length;
          for (this.k = 0; this.k < this.logitudr; this.k++) {
            if (this.Data[x].alimentoNombre == this.detectarRepetidos[this.k]) {
              this.repetido = true;
            }
          }
          if (this.repetido == false) {
            this.detectarRepetidos.push(this.Data[x].alimentoNombre);
          }
          this.repetido = false;
        }

      }
      this.logitudr = this.detectarRepetidos.length;
      var sumacal: any = 0;
      var sumcant: any = 0;
      for (x = 0; x < this.logitudr; x++) {
        for (this.k = 0; this.k < this.longituddddd; this.k++) {
          if (this.detectarRepetidos[x] == this.Data[this.k].alimentoNombre) {
            sumacal = parseInt(sumacal) + parseInt(this.Data[this.k].calorias);
            sumcant = parseInt(sumcant) + parseInt(this.Data[this.k].cantidad);
          }
        }
        this.l_alimentos.push({
          nombre: this.detectarRepetidos[x],
          cantidad: sumcant,
          calorias: sumacal
        });
        sumacal = 0;
        sumcant = 0;
      }
      this.totalPorLista = 0;
      for (ii = 0; ii < longitud; ii++) {
        var xd = Date.parse(this.Data[ii].fecha);
        var f = new Date(xd);
        if (f >= fechahaceunaño) {
          this.totalPorLista = parseInt(this.totalPorLista) + parseInt(this.Data[ii].calorias);
        }
      }
    }
  }

  xd() {
    console.log("hollaaa");
  }
  Derecha() {
    if (this.i >= 3)
      this.i = 0;
    else
      this.i++;
    this.mostrarTablaAlimentos();
  }

  Izquierda() {
    if (this.i <= 0)
      this.i = 3;
    else
      this.i--;
    this.mostrarTablaAlimentos();
  }

}
