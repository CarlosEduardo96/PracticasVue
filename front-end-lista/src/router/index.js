import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Mapa from '../components/Mapa/Mapa'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Casa',
    component: Inicio
  },
  {
    path: '/Inicio',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/Mapa',
    name: 'Mapa',
    component: Mapa
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
