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
import Vue from "vue";
import Vuetify from "vuetify/lib";
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
    items: ['Jugador defensivo', 'Playmaker', 'Jugador ofensivo', '3-And-D'],
    top: ['Top 3', 'Top 10', 'Top 15'],
    estilo:"",
    numJugadores: 0,
    rules: undefined,
    icon: undefined
  }),
    mounted(){
      axios.get('http://localhost:3000/recommended',{
        params:{
          numJugadores: this.$store.state.numJugadores,
          estilo: this.$store.state.estilo
        }
      }).then(response=>{
        console.log("Se ha resuelto correctamente la query de /StylePlayers: "+response.data)
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
    },
    methods:{
      volverAlInicio(){
        this.$router.push("/");
      }
    }
};
</script>
