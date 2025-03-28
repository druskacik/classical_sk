<template>
    <!-- Composer Filter Section -->
    <div class="px-6 pt-2 pb-6">
        <h3 class="text-lg font-serif mb-4">Filtrovať podľa skladateľa</h3>
        <div class="mt-4">
            <div class="w-full lg:w-3/5 relative composer-filter" ref="composerFilterRef">
                <div class="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg min-h-[42px] focus-within:border-blue-500">
                    <div v-for="(composer, index) in value" :key="index" class="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center">
                        {{ composer }}
                        <button @click="removeComposer(index)" class="ml-1 text-blue-500 hover:text-blue-700">
                            <span class="sr-only">Remove</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        placeholder="Hľadať..." 
                        class="flex-grow outline-none min-w-[120px]"
                        @focus="showDropdown = true"
                    />
                </div>
                <div v-if="showDropdown && filteredComposers.length > 0" class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div 
                        v-for="composer in filteredComposers" 
                        :key="composer"
                        @click="addComposer(composer)"
                        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                        {{ composer }}
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script setup>

const props = defineProps({
  composers: {
    type: Array,
    required: true
  },
  selectedComposers: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['update:composers'])
const value = ref(props.selectedComposers)

const searchQuery = ref('')
const showDropdown = ref(false)
const filteredComposers = computed(() => {
    return props.composers.filter(composer => composer.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const addComposer = (composer) => {
    if (!value.value.includes(composer)) {
        value.value.push(composer)
    }
    searchQuery.value = ''
    showDropdown.value = false
}

const removeComposer = (index) => {
    value.value.splice(index, 1)
}

const composerFilterRef = ref(null)

onMounted(() => {
    document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick)
})

const handleOutsideClick = (event) => {
    if (composerFilterRef.value && !composerFilterRef.value.contains(event.target)) {
        showDropdown.value = false
    }
}

watch(value, (newValue) => {
    emit('update:composers', newValue)
}, { deep: true })
  
  </script>
  
  <style>
  /* Add custom styles if needed */
  </style> 