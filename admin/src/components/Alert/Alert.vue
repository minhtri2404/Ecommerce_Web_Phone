<template>
    <transition name="fade">
        <div
            v-if="visible"
            class="fixed top-6 right-6 w-full max-w-xs flex items-start gap-3 px-4 py-3 border-l-4 rounded-md shadow-lg bg-white z-50"
            :class="alertStyle.border"
        >
            <!-- Icon -->
            <div class="mt-1" v-html="alertStyle.icon"></div>
            <!-- Content -->
            <div class="flex-1 text-sm">
                <p :class="alertStyle.titleColor" class="font-semibold">{{ title }}</p>
                <p class="text-gray-500">{{ message }}</p>
            </div>

            <!-- Close button -->
            <button
                @click="emit('update:modelValue', false)"
                class="text-gray-400 hover:text-gray-600 font-bold"
            >
                &times;
            </button>


            <!-- Progress bar -->
            <div
                class="absolute bottom-0 left-0 h-1 origin-left"
                :class="{
                    'bg-green-500': props.type === 'success',
                    'bg-red-500': props.type === 'error'
                }"
                :style="progressStyle"
            ></div>
        </div>
    </transition>
</template>


<script setup>
import { ref, watch, computed } from 'vue'
import { defineProps } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  type: { type: String, default: 'success' },
  title: String,
  message: String,
  duration: { type: Number, default: 3000 }
})

const emit = defineEmits(['update:modelValue'])
const visible = computed(() => props.modelValue)

// Progress animation logic
const progressWidth = ref('100%')
const progressStyle = computed(() => ({
  width: progressWidth.value,
  transition: `width ${props.duration}ms linear`
}))

watch(
  () => props.modelValue,
  (val) => {
    if (val && props.duration > 0) {
      // reset width and animate
      progressWidth.value = '100%'
      requestAnimationFrame(() => {
        progressWidth.value = '0%'
      })

      // auto close after duration
      setTimeout(() => emit('update:modelValue', false), props.duration)
    }
  }
)

const alertStyle = computed(() => ({
  success: {
    border: 'border-green-500',
    titleColor: 'text-green-700',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="text-green-500 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    `
  },
  error: {
    border: 'border-red-500',
    titleColor: 'text-red-700',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="text-red-500 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `
  }
}[props.type]))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>