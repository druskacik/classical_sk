<template>
    <!-- Composer Filter Section -->
    <div class="p-6">
        <h3 class="text-lg font-serif mb-4">Filtrovať podľa skladateľa</h3>
        <!-- <div class="flex flex-wrap gap-2">
        <button 
            v-for="composer in popularComposers" 
            :key="composer.id"
            class="px-4 py-2 rounded-full text-sm border transition-colors duration-200 hover:bg-blue-50"
            :class="{ 
            'border-blue-500 bg-blue-50 text-blue-700': false,
            'border-gray-200 text-gray-700': true 
            }"
        >
            {{ composer.name   }}
        </button>
        </div> -->

        <div class="mt-4">
            <UInputMenu class="w-full lg:w-3/5" v-model="value" multiple :items="composers"/>
        </div>
        
        <!-- <div class="mt-4">
        <div class="relative">
            <input 
            type="text" 
            placeholder="Hľadať ďalších skladateľov..."
            class="w-full px-4 py-2 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:border-blue-500"
            >
            <svg 
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        </div> -->
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

watch(value, (newValue) => {
    emit('update:composers', newValue)
})
  
  </script>
  
  <style>
  /* Add custom styles if needed */
  </style> 