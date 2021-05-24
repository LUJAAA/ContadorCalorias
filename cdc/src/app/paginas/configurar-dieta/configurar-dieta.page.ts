import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../../Servicios/alimento.service';// importo el servico
// importaciones para sqlite //
import { FormGroup, FormBuilder } from "@angular/forms";
//import { DbService } from '../../services/db.service';--------------------
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
///-------------------------------------//
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-configurar-dieta',
  templateUrl: './configurar-dieta.page.html',
  styleUrls: ['./configurar-dieta.page.scss'],
})
export class ConfigurarDietaPage implements OnInit {


  // variables MODO CONFIGURACION  -->//
  modo_configuracion: boolean = true;
  Desayuno_check: boolean = false;
  Merienda_check: boolean = false;
  Comida_check: boolean = false;
  MediaComida_check: boolean = false;
  Cena_check: boolean = false;
  PasarEscogerAlimentos: boolean = false;
  nombre_dieta: string;
  // variables modo seleccion alimentos //
  listaDesayuno: string;
  modo_Comidas: boolean = false;
  // variables modo buscar alimento
  modo_buscar: boolean = false;
  mostrar_lista_desayuno: boolean = false;
  mostrar_lista_merienda: boolean = false;
  mostrar_lista_comida: boolean = false;
  mostrar_lista_entrecomida: boolean = false;
  mostrar_lista_cena: boolean = false;
  alimentoABuscar: string;
  alimentoSeleccionado: string;
  lista_actual: string;
  mensaje_boton_uno: string = "ver +";
  mensaje_boton_dos: string = "ver +";
  mensaje_boton_tres: string = "ver +";
  mensaje_boton_cuatro: string = "ver +";
  mensaje_boton_cinco: string = "ver +";

  lista_generica: Array<any> = [];
  lista_desayuno: Array<any> = [];
  lista_merienda: Array<any> = [];
  lista_comida: Array<any> = [];
  lista_entrecomida: Array<any> = [];
  lista_cena: Array<any> = [];

  lista_global: Array<any> = [];// Aqui se recopilan todas las comidas para pasarlas a la base de datos

  comidas: any[];
  comidaSeleccionada: number;
  cantidad_comida: number;
  opcion_pz: boolean;
  opcion_gr_ml: boolean;

  desayuno_total_cal: number = 0;
  merienda_total_cal: number = 0;
  comida_total_cal: number = 0;
  entrecomida_total_cal: number = 0;
  cena_total_cal: number = 0;

  comida_seleccionada_actual: string;

  //sqlite
  mainForm: FormGroup;
  Data: any[] = []
  /*------------------temporal */
  d_uno: string = "megaman1";
  d_dos: string = "megaman2";
  d_tres: string = "megaman3";
  lista: string[] = ["uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  xd: string;
  d: string;
  listaglobal: string[] = ["xd"];
  i: number;
  x: number;
  ruta: string = "/configurar-dieta";
  pantalla: number = 0;
  // inyecto el servicio que llama a la api
  constructor(private alimentoservices: AlimentoService,
    /*private db: DbService,*/
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private db: DbService,) { }

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
  }

  /*
  ■■■■■■■■■■■■■■■■■■■■■■■■■
  ██ funciones generales ██
  ■■■■■■■■■■■■■■■■■■■■■■■■■*/

  cambiardepantallas() {
    if (this.pantalla == 0) {
      this.ruta = "/";

    }
    else if (this.pantalla == 1) {
      this.ruta = "/configurar-dieta";
      this.modo_Comidas = false;
      this.modo_buscar = false;
      // El que queremos visualizar //
      this.modo_configuracion = true;
      this.pantalla = 0;
    }
    else if (this.pantalla == 2) {
      this.ruta = "/configurar-dieta";
      this.modo_configuracion = false;
      this.modo_buscar = false;
      // El que queremos visualizar //
      this.modo_Comidas = true;
      this.pantalla = 1;////////////////
    }
    else {
      this.AgregarAlimentosLista();
      this.ruta = "/configurar-dieta";
      this.modo_configuracion = false;
      this.modo_Comidas = false;
      // El que queremos visualizar //
      this.modo_buscar = true;
      this.pantalla = 2;
    }
  }

  cambiarModoConfiguracion() {
    this.modo_Comidas = false;
    this.modo_buscar = false;
    // El que queremos visualizar //
    this.modo_configuracion = true;
    this.pantalla = 0;///////////////////
  }
  cambiarModoComidas() {
    this.modo_configuracion = false;
    this.modo_buscar = false;
    // El que queremos visualizar //
    this.modo_Comidas = true;
    this.pantalla = 1;////////////////
  }
  cambiarModoBuscar(comidaSeleccionada: number) {
    this.lista_generica = [];
    this.comidaSeleccionada = comidaSeleccionada;
    this.modo_configuracion = false;
    this.modo_Comidas = false;
    // El que queremos visualizar //
    this.modo_buscar = true;
    this.pantalla = 2;
    // bloqueamos de una vez una opcion para que no se buguie, igual se buguea checarlo ********* 
    // this.BloquearOpcionesPz()
    this.opcion_pz = false;
    this.opcion_gr_ml = true;
    // Para ver en que comidas estas cuando selecciones los alimnetos 
    switch (comidaSeleccionada) {
      case 0:
        this.comida_seleccionada_actual = "DESAYUNO";
        break;
      case 1:
        this.comida_seleccionada_actual = "MERIENDA";
        break;
      case 2:
        this.comida_seleccionada_actual = "COMIDA";
        break;
      case 3:
        this.comida_seleccionada_actual = "ENTRECOMIDA";
        break;
      case 4:
        this.comida_seleccionada_actual = "CENA";
        break;
    }
  }

  /*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ██ funciones modo configuracion ██
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
  validarHaberEscogidoUnaOpcion() {
    if (this.Desayuno_check == true || this.Merienda_check == true || this.Comida_check == true || this.MediaComida_check == true || this.Cena_check == true) {
      this.cambiarModoComidas();
    }
    else {
      console.log("debe escoger por lo menos un a comida al dia ");
    }
  }

  /*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ██ FUNCIONES MODO SELECCION DE ALIMENTOS ██ 
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
  */
  VerListaDesayuno() {
    this.mostrar_lista_desayuno = !this.mostrar_lista_desayuno;
    if (this.mostrar_lista_desayuno)
      this.mensaje_boton_uno = "ver -";
    else
      this.mensaje_boton_uno = "ver +";

    var i = this.lista_desayuno.length;
    this.desayuno_total_cal = 0;

    for (var x = 0; x < i; x++) {
      this.desayuno_total_cal = this.desayuno_total_cal + this.lista_desayuno[x].calorias;
    }
  }
  VerListaMerienda() {
    this.mostrar_lista_merienda = !this.mostrar_lista_merienda
    if (this.mostrar_lista_merienda)
      this.mensaje_boton_dos = "ver -"
    else
      this.mensaje_boton_dos = "ver +"

    var i = this.lista_merienda.length;
    this.merienda_total_cal = 0;

    for (var x = 0; x < i; x++) {
      this.merienda_total_cal = this.merienda_total_cal + this.lista_merienda[x].calorias;
    }
  }
  VerListaComida() {
    this.mostrar_lista_comida = !this.mostrar_lista_comida;
    if (this.mostrar_lista_comida)
      this.mensaje_boton_tres = "ver -";
    else
      this.mensaje_boton_tres = "ver +";

    var i = this.lista_comida.length;
    this.comida_total_cal = 0;

    for (var x = 0; x < i; x++) {
      this.comida_total_cal = this.comida_total_cal + this.lista_comida[x].calorias;
    }
  }
  VerListaEntrecomida() {
    this.mostrar_lista_entrecomida = !this.mostrar_lista_entrecomida;
    if (this.mostrar_lista_entrecomida)
      this.mensaje_boton_cuatro = "ver -"
    else
      this.mensaje_boton_cuatro = "ver +"

    var i = this.lista_entrecomida.length;
    this.entrecomida_total_cal = 0;

    for (var x = 0; x < i; x++) {
      this.entrecomida_total_cal = this.entrecomida_total_cal + this.lista_entrecomida[x].calorias;
    }
  }
  VerListaCena() {
    this.mostrar_lista_cena = !this.mostrar_lista_cena;
    if (this.mostrar_lista_cena)
      this.mensaje_boton_cinco = "ver -"
    else
      this.mensaje_boton_cinco = "ver +"

    var i = this.lista_cena.length;
    this.cena_total_cal = 0;

    for (var x = 0; x < i; x++) {
      this.cena_total_cal = this.cena_total_cal + this.lista_cena[x].calorias;
    }
  }

  /*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ██ funciones modo buscar alimento ██
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

  ObtenerUnAlimento() {
    //ObtenerUnAlimento(this.alimentoABuscar) aqui se agrega el alimento que queremos buscar
    this.alimentoservices.ObtenerUnAlimento(this.alimentoABuscar).subscribe(
      (res) => {
        this.comidas = res['hints'];
      },
      (error) => {
        console.error(error);
      }
    )
  }
  BloquearOpcionesPz() {
    this.opcion_gr_ml = !this.opcion_gr_ml;
  }
  BloquearOpcionesGrML() {
    this.opcion_pz = !this.opcion_pz;
  }

  // Agrega cualquier alimento a la lista de comida seleccionada, lista de desayuno,merienda,etc
  AgregarAlimento(alimento, calorias_pza, calorias_gr_ml, cant_comida) {
    if (!this.opcion_pz)
      this.lista_generica.push({ alimentoNombre: alimento, calorias: calorias_gr_ml, cantidad: cant_comida });
    else
      this.lista_generica.push({ alimentoNombre: alimento, calorias: calorias_pza, cantidad: cant_comida });
    console.log(this.lista_generica);
  }
  AgregarAlimentosLista() {
    switch (this.comidaSeleccionada) {
      case 0:
        // Obtenemos la longitud de la lista_desayuno
        var longitud = this.lista_generica.length;
        console.log(this.lista_generica.length);
        if (longitud > 0) {
          for (var x = 0; x < longitud; x++) {
            this.lista_desayuno.push
              ({
                alimentoNombre: this.lista_generica[x].alimentoNombre,
                calorias: parseInt(this.lista_generica[x].calorias),///----
                cantidad: this.lista_generica[x].cantidad
              });
          }
        }
        break;
      case 1:
        // Obtenemos la longitud de la lista_desayuno
        var longitud = this.lista_generica.length;
        console.log(this.lista_generica.length);
        if (longitud > 0) {
          for (var x = 0; x < longitud; x++) {
            this.lista_merienda.push
              ({
                alimentoNombre: this.lista_generica[x].alimentoNombre,
                calorias: parseInt(this.lista_generica[x].calorias),
                cantidad: this.lista_generica[x].cantidad
              });
          }
        }
        break;
      case 2:
        // Obtenemos la longitud de la lista_desayuno
        var longitud = this.lista_generica.length;
        console.log(this.lista_generica.length);
        if (longitud > 0) {
          for (var x = 0; x < longitud; x++) {
            this.lista_comida.push
              ({
                alimentoNombre: this.lista_generica[x].alimentoNombre,
                calorias: parseInt(this.lista_generica[x].calorias),
                cantidad: this.lista_generica[x].cantidad
              });
          }
        }
        break;
      case 3:
        // Obtenemos la longitud de la lista_desayuno
        var longitud = this.lista_generica.length;
        console.log(this.lista_generica.length);
        if (longitud > 0) {
          for (var x = 0; x < longitud; x++) {
            this.lista_entrecomida.push
              ({
                alimentoNombre: this.lista_generica[x].alimentoNombre,
                calorias: parseInt(this.lista_generica[x].calorias),
                cantidad: this.lista_generica[x].cantidad
              });
          }
        }
        break;
      case 4:
        // Obtenemos la longitud de la lista_desayuno
        var longitud = this.lista_generica.length;
        console.log(this.lista_generica.length);
        if (longitud > 0) {
          for (var x = 0; x < longitud; x++) {
            this.lista_cena.push
              ({
                alimentoNombre: this.lista_generica[x].alimentoNombre,
                calorias: parseInt(this.lista_generica[x].calorias),
                cantidad: this.lista_generica[x].cantidad
              });
          }
        }
        break;
    }
    this.modo_configuracion = false;
    this.modo_buscar = false;
    // El que queremos visualizar //
    this.modo_Comidas = true;
  }
  QuitarTextoRapidoAli() {
    this.alimentoABuscar = null;
  }
  QuitarTextoRapidoCant() {
    this.cantidad_comida = null;
  }

  /*
  ■■■■■■■■■■■■■■■■■■■■■
  ██ Parte de SQLite ██
  ■■■■■■■■■■■■■■■■■■■■■*/

  GuardarDieta() {
    var i: number = 0;
    var id: number = 0;
    var longitud_lista: number = 0;

    // obtenemos la fecha
    var fechaa = new Date();
    // fechaa.getDate(); // descomentar
    ////////////////////////////////////// modificamos la fecha para que sea de hace 2 semanas
    fechaa.setDate(fechaa.getDate() - 200);
    console.log(fechaa);// se cambiaron las fechas
    // borrarlista
    this.lista_global = [];
    // cargamos a una lista todos los datos
    // primero pasamos el desayuno
    longitud_lista = this.lista_desayuno.length;
    if (longitud_lista > 0)// si no es mayor a cero es que no hay nada en esa lista
    {
      for (i = 0; i < longitud_lista; i++, id++) {
        this.lista_global.push({
          id_alimento: id,// para identificar cada alimento
          comida: "Desayuno",
          alimentoNombre: this.lista_desayuno[i].alimentoNombre,
          calorias: this.lista_desayuno[i].calorias,
          cantidad: this.lista_desayuno[i].cantidad,
          fecha: fechaa
        });
      }
    }
    // segundo el merienda
    longitud_lista = this.lista_merienda.length;
    if (longitud_lista > 0)// si no es mayor a cero es que no hay nada en esa lista
    {
      for (i = 0; i < longitud_lista; i++, id++) {
        this.lista_global.push({
          id_alimento: id,// para identificar cada alimento
          comida: "Merienda",
          alimentoNombre: this.lista_merienda[i].alimentoNombre,
          calorias: this.lista_merienda[i].calorias,
          cantidad: this.lista_merienda[i].cantidad,
          fecha: fechaa
        });
      }
    }
    // tercero comida
    longitud_lista = this.lista_comida.length;
    if (longitud_lista > 0)// si no es mayor a cero es que no hay nada en esa lista
    {
      for (i = 0; i < longitud_lista; i++, id++) {
        this.lista_global.push({
          id_alimento: id,// para identificar cada alimento
          comida: "Comida",
          alimentoNombre: this.lista_comida[i].alimentoNombre,
          calorias: this.lista_comida[i].calorias,
          cantidad: this.lista_comida[i].cantidad,
          fecha: fechaa
        });
      }
    }
    // cuarto  entrecomida
    longitud_lista = this.lista_entrecomida.length;
    if (longitud_lista > 0)// si no es mayor a cero es que no hay nada en esa lista
    {
      for (i = 0; i < longitud_lista; i++, id++) {
        this.lista_global.push({
          id_alimento: id,// para identificar cada alimento
          comida: "Entrecomida",
          alimentoNombre: this.lista_entrecomida[i].alimentoNombre,
          calorias: this.lista_entrecomida[i].calorias,
          cantidad: this.lista_entrecomida[i].cantidad,
          fecha: fechaa
        });
      }
    }
    // quinto la cena
    longitud_lista = this.lista_cena.length;
    if (longitud_lista > 0)// si no es mayor a cero es que no hay nada en esa lista
    {
      for (i = 0; i < longitud_lista; i++, id++) {
        this.lista_global.push({
          id_alimento: id,// para identificar cada alimento
          comida: "Cena",
          alimentoNombre: this.lista_cena[i].alimentoNombre,
          calorias: this.lista_cena[i].calorias,
          cantidad: this.lista_cena[i].cantidad,
          fecha: fechaa
        });
      }
    }
    // calculamos el total de calorias 
    var i: number;
    var longitud: number = 0;
    var total: number = 0;
    longitud = this.lista_global.length;
    for (i = 0; i < longitud; i++) {
      total = total + this.lista_global[i].calorias;
    }
    console.log("|Resultado|" + this.nombre_dieta + "|" + total + "|");
    // despues ya podemos guardar 
    longitud = this.lista_global.length;
    for (i = 0; i < longitud; i++) {
      this.db.addSong(
        this.nombre_dieta,
        total,
        this.lista_global[i].comida,
        this.lista_global[i].alimentoNombre,
        this.lista_global[i].calorias,
        this.lista_global[i].cantidad,
        this.lista_global[i].fecha
      ).then((res) => {
        this.mainForm.reset();
      })
    }
  }

  imprimir() {
    var i: number;
    var longitud: number;
    longitud = this.lista_global.length;

    for (i = 0; i < longitud; i++)
      console.log(
        this.lista_global[i].id_alimento +
        this.lista_global[i].comida +
        this.lista_global[i].alimentoNombre +
        this.lista_global[i].calorias +
        this.lista_global[i].cantidad +
        this.lista_global[i].fecha
      );

  }

  obtenerCaloriasTotalesYGuardar() {
  }

  guardarDieta() {

  }

  storeDataVersionLuja2() {

  }
  // asise guarda cualquier info de unalabel
  /*storeDataVersionLuja() {
    this.db.addSong(
      this.d_uno,
      this.d_dos,
      this.d_tres
    ).then((res) => {
      this.mainForm.reset();
    })
  }*/
  /*el original*/
  /*storeData() {
    this.db.addSong(
      this.mainForm.value.artist,
      this.mainForm.value.song,
      this.mainForm.value.dato_dos
    ).then((res) => {
      this.mainForm.reset();
    })
  }*/

  deleteSong(id) {
    this.db.deleteSong(id).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Song deleted',
        duration: 2500
      });
      toast.present();
    })
  }
}
