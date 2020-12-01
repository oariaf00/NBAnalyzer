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

    <!-- Div con todos los elementos de la búsqueda -->
    <div style="background-color: #ffffff">
      <div text-align="center" style="margin-left: 50px; margin-right: 50px">
        <br />
        Bienvenido a NBAnalyzer, la aplicación donde podrás encontrar el jugador
        que necesitas. Nuestro sistema de recomendación basado en los parámetros
        indicados te ofrecerá una serie de opciones que se adecúen a los mismos.
        <br />
        <strong>PARÁMETROS DE BÚSQUEDA:</strong>
        <br />
        <br />
        <!-- div para el radiobutton de la posición -->
        <div id="posiciones" style="float:left; margin-right: 100px">
          <div><strong>POSICIÓN</strong></div>
          <v-radio-group v-model="jugador.posicion">
            <v-radio v-for="pos in posiciones" :key="pos" :label="`${pos}`" :value="pos"></v-radio>
          </v-radio-group>
        </div>
        <!-- div para el textfield de la edad -->
        <div id="edad" style="float:left; margin-right: 50px">
          <div><strong>EDAD</strong></div>
          <v-text-field v-model="jugador.edad" label="Ej. 27" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield del porcentaje de tiros de campo -->
        <div id="fg" style="float:left; margin-right: 50px">
          <div><strong>% TIROS DE CAMPO</strong></div>
          <v-text-field v-model="jugador.fg" label="Ej. 0.39" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield del porcentaje de tiros de 3 -->
        <div id="threep" style="float:left; margin-right: 50px">
          <div><strong>% TIROS DE 3 PUNTOS</strong></div>
          <v-text-field v-model="jugador.threep" label="Ej. 0.34" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield del porcentaje de tiros libres -->
        <div id="ft" style="float:left; margin-right: 50px">
          <div><strong>% TIROS LIBRES</strong></div>
          <v-text-field v-model="jugador.ft" label="Ej. 0.87" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield de la media de puntos por partido-->
        <div id="ft" style="float:left; margin-right: 50px">
          <div><strong>PUNTOS POR PARTIDO</strong></div>
          <v-text-field v-model="jugador.puntos" label="Ej. 16" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield de la media de rebotes por partido-->
        <div id="ft" style="float:left; margin-right: 50px">
          <div><strong>REBOTES POR PARTIDO</strong></div>
          <v-text-field v-model="jugador.rebotes" label="Ej. 4" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield de la media de asistencias por partido -->
        <div id="ft" style="float:left; margin-right: 50px">
          <div><strong>ASISTENCIAS POR PARTIDO</strong></div>
          <v-text-field v-model="jugador.asistencias" label="Ej. 8" :rules="rules" outlined ></v-text-field>
        </div>

        <div id="botonBuscarJugador" class="text-center" style="float:left">
          <v-btn rounded color="primary" v-on:click= "buscarJugadores()"> BUSCAR JUGADORES </v-btn>
        </div>
      </div>

      <div id="recomendaciones" style="float:left; margin-left: 50px; margin-right: 50px; margin-top: 50px">
        <br />
        O si no tienes claro lo que buscas, podemos ofrecerte algunos jugadores en función de su
        estilo de juego:
        <br />

        <!-- Botón para escoger tipo de jugador -->
        <v-row align="center" style="float:left; width:40%; padding-right:40px">
          <v-col cols="12">
            <v-select v-model="estilo" :items="items" :menu-props="{ top: true, offsetY: true }" label="Escoge uno de las siguientes estilos"></v-select>
          </v-col>
        </v-row>

        <!-- Botón para escoger el numero de jugadores a mostrar -->
        <v-row align="center" style="float:left; width:33%; padding-right:40px">
          <v-col cols="12">
            <v-select v-model="numJugadores" :items="top" :menu-props="{ top: true, offsetY: true }" label="Escoge el número de jugadores"></v-select>
          </v-col>
        </v-row>

        <!-- Botón para escoger la posicion del jugador -->
        <v-row align="center" style="float:left; width:30%">
          <v-col cols="12">
            <v-select v-model="posicion" :items="posiciones" :menu-props="{ top: true, offsetY: true }" label="Escoge la posición del jugador"></v-select>
          </v-col>
        </v-row>

        <!-- Boton para comenzar la búsqueda -->
        <v-row align="center" style="float:left">
          <v-col cols="12">
            <v-btn v-on:click= "recomendarJugadores()" rounded color="primary" dark >RECOMENDAR JUGADORES</v-btn>
          </v-col>
          
        </v-row>

        <!-- Finaliza el div de las recomendaciones -->
      </div>
        <!-- Finaliza el div de los elementos de busqueda -->
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
              <v-sheet class="text-center" height="270px">
                <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
                  Cerrar ventana
                </v-btn>
                <div class="text-left">
                  Para comenzar a usar esta aplicación, tan solo tendrá que
                  introducir los parámetros sobre el jugador que está buscando
                  para que el programa comience a contrastar con la base de
                  datos para darle las mejores opciones que haya en el mercado
                  de jugadores de la NBA. El único requisito obligatorio para comenzar una 
                  búsqueda es que se introduzca una posición.<br>
                  En la parte inferior disponemos de un sistema de búsqueda de jugadores
                  en función de su estilo de juego, para los que no tienen un perfil claro
                  de jugador a buscar. Deberá introducir de forma obligatoria todos los parámetros 
                  para comenzar la búsqueda.
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
const Swal = require('sweetalert2')
// @ is an alias to /src
import Vue from "vue";
import Vuetify from "vuetify/lib";
import swal from 'sweetalert2';
window.Swal = swal;

Vue.use(Vuetify);

export default {
  data: () => ({
    posiciones: ["PG", "SG", "SF", "PF", "C"],
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
    },
    items: ['Defensive rebounder', 'Playmaker', 'Offensive rebounder', '3&D', 'Defensive Player', 'All-around player'],
    top: ['Top 3', 'Top 10', 'Top 15', 'Top 25'],
    estilo:"",
    numJugadores: 0,
    posicion:'',
    rules: undefined,
    icon: undefined
  }),
  methods:{
        buscarJugadores(){
            //Comprobamos que haya introducido algun valor en todos los parámetros de búsqueda
            if(this.jugador.posicion == ''){
                //Mensaje de error
                Swal.fire({
                  title: '¡BÚSQUEDA INCOMPLETA!',
                  text: 'Debes introducir al menos la posición del jugador que quieres buscar',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                })
            }else{
                //Guardamos en la variable global jugador los valores que nos han introducido por pantalla
                this.$store.state.jugador.edad = this.jugador.edad,
                this.$store.state.jugador.posicion = this.jugador.posicion,
                this.$store.state.jugador.fg = this.jugador.fg,
                this.$store.state.jugador.threep = this.jugador.threep,
                this.$store.state.jugador.ft = this.jugador.ft,
                this.$store.state.jugador.puntos = this.jugador.puntos,
                this.$store.state.jugador.rebotes = this.jugador.rebotes,
                this.$store.state.jugador.asistencias = this.jugador.asistencias

                //Redireccionamos a jugadores, allí se hará la consulta
                this.$router.push('/Players');
            }
        },
        recomendarJugadores(){
            //Comprobamos que haya introducido algun valor en todos los parámetros de búsqueda
            if(this.estilo == '' || this.numJugadores == 0 || this.posicion==''){
                //Mensaje de error
                Swal.fire({
                  title: '  ¡BÚSQUEDA INCOMPLETA!',
                  text: 'Debes introducir el estilo del jugador, numero de jugadores y posición a buscar',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                })
            }else{
                //Guardamos el número de jugadores que desea el usuario y el estilo que ha escogido
                if(this.numJugadores=='Top 3'){
                  this.numJugadores=3
                }else if(this.numJugadores=='Top 10'){
                  this.numJugadores=10
                }else if(this.numJugadores=='Top 15'){
                  this.numJugadores=15
                }else{
                  this.numJugadores=25
                }

                this.$store.state.numJugadores = this.numJugadores
                this.$store.state.estilo = this.estilo
                this.$store.state.posicion= this.posicion
                //Redireccionamos a styles, allí se hará la consulta
                this.$router.push('/Styles');
            }
        }
    }
};
</script>
