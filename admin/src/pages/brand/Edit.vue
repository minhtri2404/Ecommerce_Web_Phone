<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <!-- Alert Toast -->
        <Alert
            v-model="showAlert"
            :type="alertType"
            :title="alertTitle"
            :message="alertMessage"
            :duration="3000"
        />
        <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl">
            <!-- Header -->
            <div class="flex justify-between items-center border-b px-6 py-4">
                <h2 class="text-lg font-semibold">Chỉnh sửa thương hiệu</h2>
                <button @click="$router.back()" class="text-gray-500 hover:text-gray-700">&times;</button>
            </div>

            <!-- Body -->
            <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <!--Tên thương hiệu-->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Tên thương hiệu</label>
                    <input
                        v-model="brand.name"
                        type="text"
                        placeholder="Nhập tên thương hiệu..."
                        class="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-indigo-200"
                    />
                </div>

                <!-- Ảnh thương hiệu -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Hình ảnh</label>
                    <input type="file" @change="onFileChange" class="mt-2" />
                    <div v-if="previewImage" class="mt-3">
                        <img :src="previewImage" alt="Preview" class="w-24 h-24 object-cover rounded" />
                    </div>
                </div>

            </div>

            <!-- Footer -->
            <div class="flex justify-end items-center border-t px-6 py-4 gap-3">
                <button
                    @click="$router.back()"
                    class="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                    Hủy
                </button>

                <button
                    @click="handleSubmit"
                    class="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    Cập nhật
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Alert from '@/components/Alert/Alert.vue';


const route = useRoute()
const router = useRouter()
const id = route.params.id

const brand = ref({
    name: '',
    image: null,
})


// State hiển thị preview ảnh
const previewImage = ref(null)

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    brand.value.image = file
    previewImage.value = URL.createObjectURL(file);
  }
};

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

// Gọi API lấy thông tin danh mục trước khi cập nhật
const fetchBrand = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/api/brand/${id}`,
        {withCredentials: true} // 👈 gửi cookie qua trình duyệt
    )
    if (res.data.success) {
      brand.value = res.data.brand
    } else {
      showToast('error', 'Lỗi', res.data.error || 'Không thể tải dữ liệu.')
    }
  } catch (error) {
    showToast('error', 'Lỗi', error.response?.data?.error || 'Không thể tải dữ liệu.')
  }
}

// Gọi APi để cập nhật danh mục
const handleSubmit = async() => {
    const formData = new FormData()
    formData.append('name', brand.value.name)
    formData.append("image", brand.value.image);

    try {
        const res = await axios.put(`http://localhost:4000/api/brand/${id}`, formData, 
            {withCredentials: true} // 👈 gửi cookie qua trình duyệt
        )
        if (res.data.success) {
            showToast('success', 'Thành công', res.data.message)
            setTimeout(() => {
                router.push('/admin-dashboard/brand')
            }, 2000)
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

onMounted(fetchBrand)

</script>