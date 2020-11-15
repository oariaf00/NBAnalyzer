import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jugador: {
      nombre: '',
      edad: undefined,
      posicion: '',
      equipo:'',
      salario: '',
      puntos: undefined,
      rebotes: undefined,
      rebotesDefensivos: undefined,
      rebotesOfensivos: undefined,
      asistencias: undefined,
      robos: undefined,
      tapones: undefined,
      turnovers: undefined,
      fg: undefined,
      ft: undefined,
      threep: undefined,
    },
    estilo: ['Jugador defensivo', 'Playmaker', 'Jugador ofensivo', '3-And-D']
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
