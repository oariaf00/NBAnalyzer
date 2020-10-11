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

    <div style="background-color: #ffffff">
      <div text-align="center" style="margin-left: 50px; margin-right: 50px">
        <br />
        Bienvenido a NBAnalyzer, la aplicación donde podrás encontrar el jugador
        que necesitas. Nuestro sistema de recomendación basado en los parámetros
        indicados te ofrecerá una serie de opciones que se adecúen a los mismos
        <br />
        <strong>PARÁMETROS DE BÚSQUEDA:</strong>
        <br />
        <br />
        <div id="posiciones" style="float:left;">
          <div><strong>POSICIÓN</strong></div>
          <v-radio-group v-model="jugador.posicion">
            <v-radio v-for="pos in posiciones" :key="pos" :label="`${pos}`" :value="pos"></v-radio>
          </v-radio-group>
        </div>
        <div id="edad" style="float:right; margin-right: 500px">
          <div><strong>EDAD</strong></div>
          <v-text-field v-model="jugador.edad" :rules="rules" outlined ></v-text-field>
        </div>
      </div>
    </div>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading"
            >¡Repórtanos con errores o posibles mejoras del sistema!</strong
          >
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
                  de jugadores de la NBA
                </div>
              </v-sheet>
            </v-bottom-sheet>
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default {
  data: () => ({
    posiciones: ["Base", "Escolta", "Alero", "Ala-pívot", "Pívot"],
    sheet: false,
    jugador: ["nombre", "edad", "posicion", "equipo" ,"salario", "puntos", "rebotes", "asistencias" , "robos" ,"%fg", "%ft", "%3p", ],
  }),
};
</script>
