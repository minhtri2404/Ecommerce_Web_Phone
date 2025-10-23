<template>
    <div class="min-h-screen flex flex-col">
        <!-- ✅ Navbar nằm trên cùng, chiếm full chiều ngang -->
        <AdminNavBar />

        <div class="flex flex-1">
            <!-- ✅ Sidebar chiếm bên trái -->
            <AdminSidebar />

            <!-- ✅ Nội dung trang -->
            <main class="flex-1 p-6 bg-white">
                <router-view />
            </main>
        </div>
    </div>
</template>


<script setup>
import AdminNavBar from '@/components/Navbar/ComNavbar.vue'
import AdminSidebar from '@/components/SideBar/ComSideBar.vue'
</script>