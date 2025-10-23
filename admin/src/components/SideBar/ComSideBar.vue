<template>
    <div class="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
        <router-link
            v-for="(item, index) in sidebarLinks"
            :key="index"
            :to="item.path"
            :class="[
                'flex items-center py-3 px-4 gap-3',
                $route.path === item.path
                ? 'border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500'
                : 'hover:bg-gray-100/90 border-white text-gray-700'
            ]"
        >
            <component :is="item.icon" />
            <p class="md:block hidden text-center">{{ item.name }}</p>
        </router-link>
    </div>
</template>

<script setup>
import { dashboardicon, category, brand, production, user, order} from '../icons/icons'

const sidebarLinks = [
  { name: 'Trang tổng quan', path: '/admin-dashboard', icon: dashboardicon },
  { name: 'Quản lý danh mục', path: '/admin-dashboard/category', icon: category },
  { name: 'Quản lý thương hiệu', path: '/admin-dashboard/brand', icon: brand },
  { name: 'Quản lý sản phẩm', path: '/admin-dashboard/product', icon: production },
  { name: 'Quản lý người dùng', path: '/admin-dashboard/user', icon: user },
  { name: 'Quản lý đơn hàng', path: '/admin-dashboard/order', icon: order },
]
</script>