import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/Auth'

// Layouts
import AdminLayout from '../components/ComAdmin.vue'

// Pages
import Login from '../pages/Login/login.vue'
import Forbidden from '../pages/403/Forbidden.vue'
import AdminDashboard from '../pages/dashboard/dashboard.vue'
import CategoryList from '../pages/category/List.vue'
import AddCategory from '../pages/category/Add.vue'
import EditCategory from '../pages/category/Edit.vue'
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
    path: '/403',
    name: 'Forbidden',
    component: Forbidden,
  },

  {
    path: '/admin-dashboard',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' }, // thêm role
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard},
      { path: 'category', name: 'CategoryList', component: CategoryList},
      { path: 'add-category', name: 'AddCategory', component: AddCategory},
      { path: 'category/:id', name: 'EditCategory', component: EditCategory},

    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { user } = useAuth() // lấy user từ store

  if(to.meta.requiresAuth && !user.value) {
    // Chưa login
    next('/login')
  } else if(to.meta.role && (!user.value || user.value.role !== to.meta.role)) {
    // Role không hợp lệ
    next('/403')
  } else {
    next()
  }
})

export default router
