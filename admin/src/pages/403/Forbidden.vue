<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-4xl font-bold text-red-600 mb-4">403</h1>
        <p class="text-xl mb-4">Bạn không có quyền truy cập trang này.</p>
        <button @click="goHome" class="px-4 py-2 bg-teal-500 text-white rounded">Quay về Login</button>
    </div>
</template>



<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => router.push('/login')
</script>
