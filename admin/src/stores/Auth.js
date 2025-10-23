import router from '@/router/index.js'
import { ref } from 'vue'
import axios from 'axios'

const user = ref(JSON.parse(localStorage.getItem('user')) || null)

const login = (userData) => {
  user.value = userData
  localStorage.setItem('user', JSON.stringify(userData))
}

const logout = async () => {
  try {
    await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true })
  } catch (error) {
    console.error('Đăng xuất lỗi:', error)
  } finally {
    user.value = null
    localStorage.removeItem('user')
    router.push('/login')
  }
}

const verify = async () => {
  try {
    const response = await axios.post(
      'http://localhost:4000/api/auth/verify',
      {},
      { withCredentials: true } // 👈 cookie được tự động gửi
    )

    if (response.data.success) {
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(response.data.user))
    } else {
      logout()
    }
  } catch (error) {
    logout()
  }
}

// // ✅ tự động xác thực mỗi 2 phút
// setInterval(() => {
//   verify()
// }, 2 * 60 * 1000)

export function useAuth() {
  return { user, login, logout, verify }
}
