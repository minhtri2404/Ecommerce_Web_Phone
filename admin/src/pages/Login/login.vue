<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-teal-100 font-[Montserrat]">
        <div class="bg-white rounded-[30px] shadow-[0_5px_25px_rgba(0,0,0,0.2)] w-[400px] max-w-full min-h-[480px] flex flex-col justify-center items-center px-10 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]">

            <form @submit.prevent="handleLogin" class="w-full flex flex-col items-center">
                <h1 class="text-3xl font-bold mb-3 text-gray-800">Đăng Nhập</h1>
                <p class="text-sm mb-6 text-gray-500 text-center leading-5">
                    Nhập email và mật khẩu để truy cập trang quản trị
                </p>

                <div class="w-full mb-4">
                    <label class="text-xs text-gray-600 block mb-1">Email</label>
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        class="bg-gray-100 w-full p-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>

                <div class="w-full mb-6">
                    <label class="text-xs text-gray-600 block mb-1">Mật khẩu</label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        class="bg-gray-100 w-full p-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>

                <button
                    type="submit"
                    class="bg-teal-500 text-white text-sm px-10 py-3 rounded-md uppercase font-semibold tracking-wide hover:bg-teal-600 active:scale-95 transition-all duration-150"
                >
                    Đăng Nhập
                </button>

                <p class="mt-5 text-xs text-gray-400">
                    © 2025 Admin System - All Rights Reserved
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuth } from '@/stores/Auth';
import { useRouter } from 'vue-router';

const {login} = useAuth();
const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async(e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:4000/api/auth/login',
        {email: email.value, password: password.value},
        {withCredentials: true} // 👈 gửi cookie qua trình duyệt
    )

      if (res.data.success) {
        login(res.data.user)
        router.push('/admin/dashboard')
      }  

    } catch (error) {
       console.log(error) 
    } 
}

</script>
