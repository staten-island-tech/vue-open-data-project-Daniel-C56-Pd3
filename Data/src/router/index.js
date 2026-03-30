import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/vues/home.vue'
import HealthData from '@/vues/healthdata.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/healthdata/:year', 
      name: 'healthdata',
      component: HealthData
    }
  ]
})