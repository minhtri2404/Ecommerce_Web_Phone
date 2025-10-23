<template>
    <div class="flex items-center justify-between pl-6 pr-4 md:pl-10 md:pr-8 border-b border-gray-300 py-3 bg-white">
        <h1 class="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            Tech<span class="text-gray-800">Thanh</span>
        </h1>

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