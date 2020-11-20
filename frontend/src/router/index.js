import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Players from '../views/Players.vue'
import Styles from '../views/Styles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Players',
    name: 'players',
    component: Players
  },
  {
    path: '/Styles',
    name: 'styles',
    component: Styles
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
