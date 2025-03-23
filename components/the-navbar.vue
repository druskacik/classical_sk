<template>
    <nav class="bg-white">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="text-xl font-semibold text-gray-800">
                        classical.sk
                    </a>
                </div>
                <UNavigationMenu
                    content-orientation="vertical"
                    variant="link"
                    :highlight="false"
                    :items="items"
                    class="w-full ml-4 z-1"
                />
            </div>
        </div>
    </nav>
</template>

<script setup>

const cities = useState('cities')

const items = ref([
    {
        label: 'Mestá',
        children: cities.value.map(city => ({ label: city.city, href: `/${city.city}` }))
    },
    { label: 'Kontakt', href: '/kontakt' },
]);
</script>