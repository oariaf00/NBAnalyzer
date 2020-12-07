<template>
  <v-app>
    <div id="AppBar" position="relative">
      <v-spacer></v-spacer>
      <v-app-bar color="red" height="70px" dense dark>
        <div class="d-flex align-center">
          <v-img
            alt="Logo NBA"
            class="shrink mr-2"
            contain
            src="@/assets/logo.png"
            transition="scale-transition"
            width="100"
          />
          <v-toolbar-title justify-content:center>NBAnalyzer</v-toolbar-title>
        </div>

        <v-spacer></v-spacer>

        <v-btn href="https://es.nba.com/news" target="_blank" text>
          <span class="mr-2">Últimas noticias en la NBA</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <br>
      <h3>Estos son los mejores {{ this.$store.state.estilo }} de la liga en la posicion de {{ this.$store.state.posicion }}</h3>
    <br>
    <div id="botonBuscarJugador" class="text-center" style="float:left">
      <v-btn rounded color="primary" v-on:click= "volverAlInicio()"> VOLVER A LA PÁGINA PRINCIPAL </v-btn>
    </div>
    <br>

    <div>
      <v-data-table :headers="headers" :items="jugadores" :items-per-page="15" class="elevation-1"></v-data-table>
    </div>

    <!-- Pie de pagina -->
    <div id="piePagina" >
      <v-footer dark padless >
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading">¡Repórtanos con errores o posibles mejoras del sistema!</strong>
          <v-spacer></v-spacer>
          <v-btn href="https://www.linkedin.com/in/omar-arias-fern%C3%A1ndez-7a71871b7/" target="_blank" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">mdi-message</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong
            >Curso 20/21 Sistemas de información de gestión y business inteligence<br />
            <v-bottom-sheet v-model="sheet" inset>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="orange" dark v-bind="attrs" v-on="on"
                  >AYUDA
                </v-btn>
              </template>
              <v-sheet class="text-center" height="200px">
                <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
                  Cerrar ventana
                </v-btn>
                <div class="my-3">
                  Para comenzar a usar esta aplicación, tan solo tendrá que
                  introducir los parámetros sobre el jugador que está buscando
                  para que el programa comience a contrastar con la base de
                  datos para darle las mejores opciones que haya en el mercado
                  de jugadores de la NBA.<br>
                  En la parte inferior disponemos de un sistema de búsqueda de jugadores
                  en función de su estilo de juego, para los que no tienen un perfil claro
                  de jugador a buscar
                </div>
              </v-sheet>
            </v-bottom-sheet>
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
const Swal = require('sweetalert2')
import Vue from "vue";
import Vuetify from "vuetify/lib";
import swal from 'sweetalert2';
window.Swal = swal;
const axios= require("axios");

Vue.use(Vuetify);

export default {
  data: () => ({
    headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        { text: 'Edad',
          align: 'start',
          sortable: false,
          value: 'edad'
        },
        {
          text: 'POS',
          align: 'start',
          sortable: false,
          value: 'posicion'
        },
        {
          text: 'Equipo',
          align: 'start',
          sortable: false,
          value: 'equipo'
        },
        {
          text: 'SALARY ($)',
          align: 'start',
          sortable: false,
          value: 'salario'
        },
        {
          text: 'PPG',
          align: 'start',
          sortable: false,
          value: 'puntos'
        },
        {
          text: 'RPG',
          align: 'start',
          sortable: false,
          value: 'rebotes'
        },
        {
          text: 'ORB',
          align: 'start',
          sortable: false,
          value: 'rebotesOfensivos'
        },
        {
          text: 'DRB',
          align: 'start',
          sortable: false,
          value: 'rebotesDefensivos'
        },
        {
          text: 'SPG',
          align: 'start',
          sortable: false,
          value: 'robos'
        },
        {
          text: 'TPG',
          align: 'start',
          sortable: false,
          value: 'perdidas'
        },
        {
          text: 'APG',
          align: 'start',
          sortable: false,
          value: 'asistencias'
        },
        {
          text: 'FG%',
          align: 'start',
          sortable: false,
          value: 'fg'
        },
        {
          text: 'FT%',
          align: 'start',
          sortable: false,
          value: 'ft'
        },
        {
          text: '3P%',
          align: 'start',
          sortable: false,
          value: 'threep'
        },
        {
          text: 'FPG',
          align: 'start',
          sortable: false,
          value: 'faltas'
        },
        

    ],
    jugadores:[],
    sheet: false,
    //Objeto jugador para almacenar los datos y pasárselos a la base de datos como parámetro
    jugador: {
      nombre: '',
      edad: undefined,
      posicion: '',
      equipo:'',
      salario: '',
      puntos: undefined,
      rebotes: undefined,
      rebotesOfensivos: undefined,
      rebotesDefensivos: undefined,
      robos: undefined,
      perdidas: undefined,
      asistencias: undefined,
      fg: undefined,
      ft: undefined,
      threep: undefined,
      faltas: undefined
    },
    items: ['Defensive rebounder', 'Playmaker', 'Offensive rebounder', '3&D', 'Defensive Player', 'All-around player'],
    top: ['Top 3', 'Top 10', 'Top 15'],
    estilo:"",
    numJugadores: 0,
    avg3p:0,
    avgRobos:0,
    avgRebotesDef:0,
    avgAsistencias:0,
    avgPuntos:0,
    avgTapones:0,
    avgRebotes:0,
    rules: undefined,
    icon: undefined
  }),
    mounted(){
      //Comprobamos el estilo de jugador que sea ya que en función de ello se le
      //enviará una serie de parámetros u otros.
      if(this.$store.state.estilo=='3&D'){
          //Cogemos la media de triples de jugadores de la base de datos
          axios.get('http://localhost:3000/avg3p').then(response=>{
            //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
            this.avg3p = response.data[0];
            this.$store.state.avg3p = this.avg3p

             //Cogemos la media de robos de jugadores de la base de datos
            axios.get('http://localhost:3000/avgRobos').then(response=>{
              //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
              this.avgRobos = response.data[0];
              this.$store.state.avgRobos = this.avgRobos

              //Cogemos la media de rebotes defensivos de la base de datos
              axios.get('http://localhost:3000/avgRebotesDef').then(response=>{
                //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
                this.avgRebotesDef = response.data[0];
                this.$store.state.avgRebotesDef = this.avgRebotesDef

                 //Para considerar a un jugador playmaker debe superar la media de puntos de un base y escolta, luego
                //los ordenaremos por asistencias
                axios.get('http://localhost:3000/recommended',{
                    params:{
                      numJugadores: this.$store.state.numJugadores,
                      estilo: this.$store.state.estilo,
                      posicion: this.$store.state.posicion,
                      avg3p: this.$store.state.avg3p,
                      avgRobos: this.$store.state.avgRobos,
                      avgRebotesDef: this.$store.state.avgRebotesDef
                    }
                    }).then(response=>{
                      if(response.data==''){
                              //Mensaje de error
                              Swal.fire({
                                title: '¡BÚSQUEDA SIN RESULTADOS!',
                                text: 'No hay jugadores que se ajusten a los parámetros introducidos.',
                                confirmButtonText: 'Aceptar',
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                  this.$router.push("/")
                                }
                              })
                            }
                    //AQUI RELLENAMOS EL ARRAY DE JUGADORES PARA QUE LOS MUESTRE EN LA TABLA
                    //Cada jugador va a venir acompañado de 16 valores, con lo cual cada 16 i cambiamos de jugador
                    
                    for (var step = 0; step < response.data.length; step+=16) {
                      this.jugadores.push({ 
                        "nombre": response.data[step],
                        "edad": response.data[step+1],
                        "posicion": response.data[step+2],
                        "equipo":response.data[step+3],
                        "salario":response.data[step+4],
                        "puntos":response.data[step+5],
                        "rebotes":response.data[step+6],
                        "rebotesOfensivos":response.data[step+7],
                        "rebotesDefensivos":response.data[step+8],
                        "robos":response.data[step+9],
                        "perdidas":response.data[step+10],
                        "asistencias":response.data[step+11],
                        "fg":response.data[step+12],
                        "ft":response.data[step+13],
                        "threep":response.data[step+14],
                        "faltas": response.data[step+15]
                      });
                    }
              }).catch((e) => {
                    console.log(e.message);
              });
            }).catch((e) => {
                  console.log(e.message);
            });
          }).catch((e) => {
                console.log(e.message);
          });
        }).catch((e) => {
                console.log(e.message);
        });
      }
      else if(this.$store.state.estilo=='Playmaker'){
        //Cogemos la media de asistencias de un base/escolta de la base de datos
          axios.get('http://localhost:3000/avgAsistencias').then(response=>{
            //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
            this.avgAsistencias = response.data[0];
            this.$store.state.avgAsistencias = this.avgAsistencias

             //Cogemos la media de asistencias de un base/escolta de la base de datos
            axios.get('http://localhost:3000/avgPuntos').then(response=>{
                //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
                this.avgPuntos = response.data[0];
                this.$store.state.avgPuntos = this.avgPuntos

                //Para considerar a un jugador un 3&D vamos a buscar todos los jugadores que superen la media en estos
                //3 parámetros que hemos buscado anteriormente
                axios.get('http://localhost:3000/recommended',{
                  params:{
                    numJugadores: this.$store.state.numJugadores,
                    estilo: this.$store.state.estilo,
                    posicion: this.$store.state.posicion,
                    avgPuntos: this.$store.state.avgPuntos,
                    avgAsistencias: this.$store.state.avgAsistencias,
                  }
                }).then(response=>{
                  if(response.data==''){
                    //Mensaje de error
                    Swal.fire({
                      title: '¡BÚSQUEDA SIN RESULTADOS!',
                      text: 'No hay jugadores que se ajusten a los parámetros introducidos.',
                      confirmButtonText: 'Aceptar',
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          this.$router.push("/")
                        }
                      })
                    }
                  //AQUI RELLENAMOS EL ARRAY DE JUGADORES PARA QUE LOS MUESTRE EN LA TABLA
                  //Cada jugador va a venir acompañado de 16 valores, con lo cual cada 16 i cambiamos de jugador
                  
                  for (var step = 0; step < response.data.length; step+=16) {
                    this.jugadores.push({ 
                      "nombre": response.data[step],
                      "edad": response.data[step+1],
                      "posicion": response.data[step+2],
                      "equipo":response.data[step+3],
                      "salario":response.data[step+4],
                      "puntos":response.data[step+5],
                      "rebotes":response.data[step+6],
                      "rebotesOfensivos":response.data[step+7],
                      "rebotesDefensivos":response.data[step+8],
                      "robos":response.data[step+9],
                      "perdidas":response.data[step+10],
                      "asistencias":response.data[step+11],
                      "fg":response.data[step+12],
                      "ft":response.data[step+13],
                      "threep":response.data[step+14],
                      "faltas": response.data[step+15]
                    });
                  }
          }).catch((e) => {
                console.log(e.message);
          });
        }).catch((e) => {
              console.log(e.message);
        });
      }).catch((e) => {
              console.log(e.message);
      });

      }else if(this.$store.state.estilo=='Offensive rebounder'){
          //Vamos a buscar a todos los jugadores y ordenarlos por sus estadísticas de rebotes ofensivos
          axios.get('http://localhost:3000/recommended',{
              params:{
                numJugadores: this.$store.state.numJugadores,
                estilo: this.$store.state.estilo,
                posicion: this.$store.state.posicion,
              }
          }).then(response=>{
            if(response.data==''){
                    //Mensaje de error
                    Swal.fire({
                      title: '¡BÚSQUEDA SIN RESULTADOS!',
                      text: 'No hay jugadores que se ajusten a los parámetros introducidos.',
                      confirmButtonText: 'Aceptar',
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        this.$router.push("/")
                      }
                    })
                  }
              //AQUI RELLENAMOS EL ARRAY DE JUGADORES PARA QUE LOS MUESTRE EN LA TABLA
              //Cada jugador va a venir acompañado de 16 valores, con lo cual cada 16 i cambiamos de jugador
              
              for (var step = 0; step < response.data.length; step+=16) {
                this.jugadores.push({ 
                  "nombre": response.data[step],
                  "edad": response.data[step+1],
                  "posicion": response.data[step+2],
                  "equipo":response.data[step+3],
                  "salario":response.data[step+4],
                  "puntos":response.data[step+5],
                  "rebotes":response.data[step+6],
                  "rebotesOfensivos":response.data[step+7],
                  "rebotesDefensivos":response.data[step+8],
                  "robos":response.data[step+9],
                  "perdidas":response.data[step+10],
                  "asistencias":response.data[step+11],
                  "fg":response.data[step+12],
                  "ft":response.data[step+13],
                  "threep":response.data[step+14],
                  "faltas": response.data[step+15]
                });
              }
            }).catch((e) => {
                    console.log(e.message);
            });

      }else if(this.$store.state.estilo=='Defensive rebounder'){
          //Vamos a buscar a todos los jugadores y ordenarlos por sus estadísticas de rebotes ofensivos
          axios.get('http://localhost:3000/recommended',{
              params:{
                numJugadores: this.$store.state.numJugadores,
                estilo: this.$store.state.estilo,
                posicion: this.$store.state.posicion,
              }
          }).then(response=>{
            if(response.data==''){
                    //Mensaje de error
                    Swal.fire({
                      title: '¡BÚSQUEDA SIN RESULTADOS!',
                      text: 'No hay jugadores que se ajusten a los parámetros introducidos.',
                      confirmButtonText: 'Aceptar',
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        this.$router.push("/")
                      }
                    })
                  }

              //AQUI RELLENAMOS EL ARRAY DE JUGADORES PARA QUE LOS MUESTRE EN LA TABLA
              //Cada jugador va a venir acompañado de 16 valores, con lo cual cada 16 i cambiamos de jugador
              
              for (var step = 0; step < response.data.length; step+=16) {
                this.jugadores.push({ 
                  "nombre": response.data[step],
                  "edad": response.data[step+1],
                  "posicion": response.data[step+2],
                  "equipo":response.data[step+3],
                  "salario":response.data[step+4],
                  "puntos":response.data[step+5],
                  "rebotes":response.data[step+6],
                  "rebotesOfensivos":response.data[step+7],
                  "rebotesDefensivos":response.data[step+8],
                  "robos":response.data[step+9],
                  "perdidas":response.data[step+10],
                  "asistencias":response.data[step+11],
                  "fg":response.data[step+12],
                  "ft":response.data[step+13],
                  "threep":response.data[step+14],
                  "faltas": response.data[step+15]
                });
              }
            }).catch((e) => {
                    console.log(e.message);
            });

      } else if(this.$store.state.estilo=='Defensive Player'){
          //Cogemos la media de robos de jugadores de la base de datos
          axios.get('http://localhost:3000/avgRobos').then(response=>{
            //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
            this.avgRobos = response.data[0];
            this.$store.state.avgRobos = this.avgRobos

              //Cogemos la media de rebotes defensivos de la base de datos
            axios.get('http://localhost:3000/avgRebotesDef').then(response=>{
              //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
              this.avgRebotesDef = response.data[0];
              this.$store.state.avgRebotesDef = this.avgRebotesDef

              //Cogemos la media de tapones de la base de datos
              axios.get('http://localhost:3000/avgTapones').then(response=>{
                //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
                this.avgTapones = response.data[0];
                this.$store.state.avgTapones = this.avgTapones

                //Para considerar a un jugador playmaker debe superar la media de puntos de un base y escolta, luego
          //los ordenaremos por asistencias
          axios.get('http://localhost:3000/recommended',{
              params:{
                numJugadores: this.$store.state.numJugadores,
                estilo: this.$store.state.estilo,
                posicion: this.$store.state.posicion,
                avgRobos: this.$store.state.avgRobos,
                avgRebotesDef: this.$store.state.avgRebotesDef,
                avgTapones: this.$store.state.avgTapones
              }
          }).then(response=>{
            if(response.data==''){
                    //Mensaje de error
                    Swal.fire({
                      title: '¡BÚSQUEDA SIN RESULTADOS!',
                      text: 'No hay jugadores que se ajusten a los parámetros introducidos.',
                      confirmButtonText: 'Aceptar',
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        this.$router.push("/")
                      }
                    })
                  }

              //AQUI RELLENAMOS EL ARRAY DE JUGADORES PARA QUE LOS MUESTRE EN LA TABLA
              //Cada jugador va a venir acompañado de 16 valores, con lo cual cada 16 i cambiamos de jugador
              
              for (var step = 0; step < response.data.length; step+=16) {
                this.jugadores.push({ 
                  "nombre": response.data[step],
                  "edad": response.data[step+1],
                  "posicion": response.data[step+2],
                  "equipo":response.data[step+3],
                  "salario":response.data[step+4],
                  "puntos":response.data[step+5],
                  "rebotes":response.data[step+6],
                  "rebotesOfensivos":response.data[step+7],
                  "rebotesDefensivos":response.data[step+8],
                  "robos":response.data[step+9],
                  "perdidas":response.data[step+10],
                  "asistencias":response.data[step+11],
                  "fg":response.data[step+12],
                  "ft":response.data[step+13],
                  "threep":response.data[step+14],
                  "faltas": response.data[step+15]
                });
              }
              }).catch((e) => {
                    console.log(e.message);
              });
            }).catch((e) => {
                  console.log(e.message);
            });
          }).catch((e) => {
                console.log(e.message);
          });
        }).catch((e) => {
                console.log(e.message);
        });
      } else if(this.$store.state.estilo=='All-around player'){
            //Si es un base o escolta buscamos que tenga un número de rebotes y tapones mayor a la media de un alero, ala-pivot o pivot
            if(this.$store.state.posicion=='PG' || this.$store.state.posicion=='SG'){
              //Cogemos la media de rebotes de la base de datos
              axios.get('http://localhost:3000/avgRebotes').then(response=>{
                  //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
                  this.avgRebotes = response.data[0];
                  this.$store.state.avgRebotes = this.avgRebotes

                  axios.get('http://localhost:3000/recommended',{
                  params:{
                    numJugadores: this.$store.state.numJugadores,
                    estilo: this.$store.state.estilo,
                    posicion: this.$store.state.posicion,
                    avgRebotes: this.$store.state.avgRebotes,
                  }
                }).then(response=>{
                  if(response.data==''){
                   //Mensaje de error
                    Swal.fire({
                      title: '¡BÚSQUEDA SIN RESULTADOS!',
                      text: 'No hay jugadores que se ajusten a los parámetros introducidos.',
                      confirmButtonText: 'Aceptar',
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        this.$router.push("/")
                      }
                    })
                  }

                  //AQUI RELLENAMOS EL ARRAY DE JUGADORES PARA QUE LOS MUESTRE EN LA TABLA
                  //Cada jugador va a venir acompañado de 16 valores, con lo cual cada 16 i cambiamos de jugador
                  
                  for (var step = 0; step < response.data.length; step+=16) {
                    this.jugadores.push({ 
                      "nombre": response.data[step],
                      "edad": response.data[step+1],
                      "posicion": response.data[step+2],
                      "equipo":response.data[step+3],
                      "salario":response.data[step+4],
                      "puntos":response.data[step+5],
                      "rebotes":response.data[step+6],
                      "rebotesOfensivos":response.data[step+7],
                      "rebotesDefensivos":response.data[step+8],
                      "robos":response.data[step+9],
                      "perdidas":response.data[step+10],
                      "asistencias":response.data[step+11],
                      "fg":response.data[step+12],
                      "ft":response.data[step+13],
                      "threep":response.data[step+14],
                      "faltas": response.data[step+15]
                    });
                  }
              }).catch((e) => {
                    console.log(e.message);
              });
            }).catch((e) => {
                    console.log(e.message);
            });
          }

          /*******************************************************************************************************************/

          //Si es un alero, ala-pivot o pivot buscamos que tenga un número de asistencias mayor a la media de un base o escolta
          else if(this.$store.state.posicion=='SF' || this.$store.state.posicion=='PF' || this.$store.state.posicion=='C'){
            axios.get('http://localhost:3000/avgAsistencias').then(response=>{
              //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
              this.avgAsistencias = response.data[0];
              this.$store.state.avgAsistencias = this.avgAsistencias

              axios.get('http://localhost:3000/avgPuntos').then(response=>{
              //Introducimos dicho valor en la variable correspondiente para luego hacer la consulta
              this.avgPuntos = response.data[0];
              this.$store.state.avgPuntos = this.avgPuntos

              axios.get('http://localhost:3000/recommended',{
              params:{
                numJugadores: this.$store.state.numJugadores,
                estilo: this.$store.state.estilo,
                posicion: this.$store.state.posicion,
                avgAsistencias: this.$store.state.avgAsistencias,
                avgPuntos: this.$store.state.avgPuntos
              }
          }).then(response=>{
            if(response.data==''){
                    //Mensaje de error
                    Swal.fire({
                      title: '¡BÚSQUEDA SIN RESULTADOS!',
                      text: 'No hay jugadores que se ajusten a los parámetros introducidos.',
                      confirmButtonText: 'Aceptar',
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        this.$router.push("/")
                      }
                    })
                  }
                  
                //AQUI RELLENAMOS EL ARRAY DE JUGADORES PARA QUE LOS MUESTRE EN LA TABLA
                //Cada jugador va a venir acompañado de 16 valores, con lo cual cada 16 i cambiamos de jugador
                
                for (var step = 0; step < response.data.length; step+=16) {
                  this.jugadores.push({ 
                    "nombre": response.data[step],
                    "edad": response.data[step+1],
                    "posicion": response.data[step+2],
                    "equipo":response.data[step+3],
                    "salario":response.data[step+4],
                    "puntos":response.data[step+5],
                    "rebotes":response.data[step+6],
                    "rebotesOfensivos":response.data[step+7],
                    "rebotesDefensivos":response.data[step+8],
                    "robos":response.data[step+9],
                    "perdidas":response.data[step+10],
                    "asistencias":response.data[step+11],
                    "fg":response.data[step+12],
                    "ft":response.data[step+13],
                    "threep":response.data[step+14],
                    "faltas": response.data[step+15]
                  });
                }
              }).catch((e) => {
                    console.log(e.message);
              });
            }).catch((e) => {
                  console.log(e.message);
            });
          }).catch((e) => {
                  console.log(e.message);
          });
          }
      }
    },
    methods:{
      volverAlInicio(){
        this.$router.push("/");
      }
    }
};
</script>
