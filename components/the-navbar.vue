<template>
    <nav class="bg-white">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="text-xl font-semibold text-gray-800">
                        classical.sk
                    </a>
                </div>
                <!-- Desktop menu -->
                <UNavigationMenu
                    content-orientation="vertical"
                    variant="link"
                    :highlight="false"
                    :items="items"
                    class="hidden md:block w-full ml-6 z-1"
                />
                <!-- Mobile hamburger menu -->
                <div class="md:hidden">
                    <UButton 
                        class="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        @click="isMenuOpen = !isMenuOpen"
                        variant="link"
                        aria-label="Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </UButton>
                    <div v-if="isMenuOpen" class="fixed inset-0 bg-white z-50 overflow-y-auto">
                        <div class="flex justify-end p-4">
                            <UButton
                                class="text-gray-500 hover:text-gray-700 focus:outline-none"
                                @click="isMenuOpen = false"
                                variant="link"
                                aria-label="Close menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </UButton>
                        </div>
                        <UNavigationMenu
                            orientation="vertical"
                            variant="link"
                            :highlight="false"
                            color="neutral"
                            :items="items"
                        >
                            <template #item="{ item }">
                                <a :href="item.href" class="block px-4 py-2 text-gray-800 hover:text-gray-900">
                                    {{ item.label }}
                                </a>
                            </template>
                            <template #cities="{ item }">
                                <a :href="item.href" class="block px-4 py-2 text-gray-800 hover:text-gray-900">
                                    <div class="flex items-center">
                                        {{ item.label }}
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </a>
                            </template>
                        </UNavigationMenu>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>

const isMenuOpen = ref(false)

const router = useRouter()

// Close mobile menu when route changes
watch(
  () => router.currentRoute.value.path,
  () => {
    isMenuOpen.value = false
  }
)


const cities = useState('cities')

const items = ref([
    {
        label: 'Mestá',
        children: cities.value.map(city => ({ label: city.city, href: `/${city.city}` })),
        slot: 'cities'
    },
    { label: 'Zdroje', href: '/zdroje' },
    // { label: 'Blog', href: '/blog' },
    { label: 'O projekte', href: '/blog/o-projekte' },
    { label: 'Kontakt', href: '/kontakt' },
]);
</script>