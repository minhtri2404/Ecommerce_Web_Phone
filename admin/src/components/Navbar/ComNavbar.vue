<template>
    <div class="flex items-center justify-between pl-6 pr-4 md:pl-10 md:pr-8 border-b border-gray-300 py-3 bg-white">
        <h1 class="text-3xl font-bold text-blue-300">TechThanh</h1>
        <div class="flex items-center gap-5 text-gray-500">
            <p>Hi, {{ user.name }}</p>
            <button @click="logout" class="border rounded-full text-sm px-4 py-1 hover:bg-gray-100">Logout</button>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '@/stores/Auth'

const {user, logout} = useAuth()

</script>