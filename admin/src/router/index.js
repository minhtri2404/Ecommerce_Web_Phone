import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AdminLayout from '../components/ComAdmin.vue'

// Pages
import Login from '../pages/Login/login.vue'
import AdminDashboard from '../pages/dashboard/dashboard.vue'
import CategoryList from '../pages/category/List.vue'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  
  {
    path: '/',
    redirect: '/login' // 👈 thêm dòng này
  },

  {
    path: '/admin-dashboard',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'category', name: 'CategoryList', component: CategoryList }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
