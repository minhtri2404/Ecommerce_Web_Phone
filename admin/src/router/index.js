import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login/login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  
  {
    path: '/',
    redirect: '/login' // 👈 thêm dòng này
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
