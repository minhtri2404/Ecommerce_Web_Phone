<template>
    <div class="flex-1 py-10 flex flex-col justify-between">
        <!-- Alert Toast -->
        <Alert
            v-model="showAlert"
            :type="alertType"
            :title="alertTitle"
            :message="alertMessage"
            :duration="3000"
        />

        <h2 class="text-2xl font-semibold text-center mb-6">Quản Lý Danh Mục</h2>
        <!-- Search -->
        <div class="flex justify-between items-center px-4 mb-8">
            <div class="w-full max-w-xs">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Tìm kiếm theo tên"
                    class="w-full px-4 py-2 border border-indigo-300 rounded focus:outline-none focus:ring focus:border-indigo-400 shadow-sm"
                />
            </div>

             <router-link
                to="/admin-dashboard/add-category"
                class="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow"
                >
                Thêm danh mục
            </router-link>
        </div>

        <div class="w-full md:p-10 p-4">
            <div class="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                <table class="md:table-auto table-fixed w-full overflow-hidden">
                    <thead class="text-gray-900 text-sm text-left">
                        <tr>
                            <th class="px-4 py-3 font-semibold truncate">STT</th>
                            <th class="px-4 py-3 font-semibold truncate">Ảnh</th>
                            <th class="px-4 py-3 font-semibold truncate">Tên danh mục</th>
                            <th class="px-4 py-3 font-semibold truncate">Mô tả</th>
                            <th class="px-4 py-3 font-semibold truncate text-center">Hành động</th>
                        </tr>
                    </thead>

                    <tbody class="text-sm text-gray-500">
                        <tr
                            v-for="category in paginatedCategory"
                            :key="category.id"
                            class="border-t border-gray-500/20"
                        >
                            <td class="px-4 py-3">{{ category.sno }}</td>
                            <td class="px-4 py-3">
                                <img
                                    v-if="category.categoryImage"
                                    :src="`http://localhost:4000/uploads/category/${category.categoryImage}`"
                                    alt="Hình ảnh danh mục"
                                    class="w-16 h-16 object-cover rounded"
                                >
                            </td>
                            <td class="px-4 py-3">{{ category.categoryName }}</td>
                            <td class="px-4 py-3">{{ category.categoryDescription }}</td>
                            <td class="px-4 py-3 text-center">
                                <div class="flex justify-center gap-2">
                                    <router-link
                                        :to="`/admin-dashboard/category/${category.id}`"
                                        class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                        >
                                        Sửa
                                    </router-link>
                                    <button
                                        @click="deleteCategory(category.id)"
                                        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Pagination -->
                <div class="mt-6 flex justify-end">
                    <div class="flex items-center gap-4 text-gray-500 font-medium">
                        <!-- Previous -->
                        <button @click="prevPage" :disabled="currentPage === 1" aria-label="prev"
                            class="rounded-full bg-slate-200/50 disabled:opacity-50">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                                fill="#475569" stroke="#475569" stroke-width=".078" />
                            </svg>
                        </button>

                        <!-- Page Numbers -->
                        <div class="flex items-center gap-2 text-sm font-medium">
                            <button
                                v-for="page in totalPages"
                                :key="page"
                                @click="goToPage(page)"
                                :class="[ 'h-10 w-10 flex items-center justify-center aspect-square',
                                currentPage === page
                                    ? 'text-indigo-500 border border-indigo-200 rounded-full'
                                    : ''
                                ]"
                            >{{ page }}</button>
                        </div>

                        <!-- Next -->
                        <button @click="nextPage" :disabled="currentPage === totalPages" aria-label="next"
                            class="rounded-full bg-slate-200/50 disabled:opacity-50">
                            <svg class="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                                fill="#475569" stroke="#475569" stroke-width=".078" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Alert from '@/components/Alert/Alert.vue';

const categories  = ref([])
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 4

// ALERT state
const showAlert = ref(false)
const alertType = ref('success')
const alertTitle = ref('')
const alertMessage = ref('')

const showToast = (type, title, message) => {
  alertType.value = type
  alertTitle.value = title
  alertMessage.value = message
  showAlert.value = true
}

// Gọi API để lấy danh sách danh mục
const fetchCategory = async() => {
   try {
        const res = await axios.get('http://localhost:4000/api/category/')
        if (res && res.data && Array.isArray(res.data.category)) {
            categories.value = res.data.category.map((category, index) => ({
                id: category._id,
                sno: index + 1,
                categoryName: category.categoryName,
                categoryDescription: category.categoryDescription,
                categoryImage: category.categoryImage
            }))
        }
   } catch (error) {
        if (error.response && !error.response.data.success) {
            showToast('error', 'Đã xảy ra lỗi khi tải dữ liệu.', error.response.data.error);
        }
   }
}

// Gọi API để xóa danh mục
const deleteCategory = async(id) => {
    const confirmDelete = confirm('Bạn có muốn xóa danh mục này không')
    if (confirmDelete) {
        try {
            const res = await axios.delete(`http://localhost:4000/api/category/${id}`,
                {withCredentials: true} // 👈 gửi cookie qua trình duyệt
            )
            if (res.data.success) {
                showToast('success', 'Thành công', res.data.message)
                await fetchCategory()
            } else{
                showToast('error', 'Thất bại', res.data.message)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                showToast('error', 'Đã xảy ra lỗi khi tải dữ liệu.', error.response.data.error);
            }  else {
                showToast('error', 'Lỗi kết nối', 'Không thể kết nối đến server.');
            }
        }
    }
}

// Tìm kiếm khách hàng theo tiêu đề
const filteredCategory = computed(() =>
  categories.value.filter(category =>
    category.categoryName.toLowerCase().includes(search.value.toLowerCase())
  )
)

// Pagination
const totalPages = computed(() => Math.ceil(filteredCategory.value.length / itemsPerPage))
const paginatedCategory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCategory.value.slice(start, end)
})

const goToPage = page => { if (page >= 1 && page <= totalPages.value) currentPage.value = page }
const prevPage = () => goToPage(currentPage.value - 1)
const nextPage = () => goToPage(currentPage.value + 1)

onMounted(fetchCategory)
</script>