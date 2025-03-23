<template>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
            <tbody class="divide-y divide-gray-200">
            <tr v-for="concert in concerts" :key="concert.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <!-- Mobile layout (flex column) -->
                    <div class="lg:hidden flex flex-col gap-2">
                        <span class="text-sm text-gray-900">{{ formatDate(concert.date) }}</span>
                        <div class="flex flex-wrap gap-2">
                            <NuxtLink :to="`/${concert.city}`">
                                <TableBadge :label="concert.city" variant="outline" />
                            </NuxtLink>
                            <TableBadge :label="concert.source"/>
                        </div>
                        <div class="flex flex-wrap items-baseline">
                            <a :href="concert.url" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-900 font-medium hover:underline mr-2">
                                {{ concert.title }}
                            </a>
                            <span v-for="(composer, index) in concert.composers" :key="composer.id" class="inline-block">
                            <span v-if="index > 0" class="text-gray-500">, </span>
                                <span class="text-sm text-gray-500 font-medium hover:underline cursor-pointer" @click="addComposer(composer.name)">
                                    {{ formatComposerName(composer.name) }}
                                </span>
                            </span>
                        </div>
                    </div>

                    <!-- Desktop layout (original) -->
                    <div class="hidden lg:block">
                        <span class="text-sm text-gray-900">{{ formatDate(concert.date) }}</span>
                    </div>
                </td>
                <td class="px-6 py-4 hidden lg:table-cell">
                    <a :href="concert.url" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-900 font-medium hover:underline">
                        {{ concert.title }}
                    </a>
                    <span @click="selectCity(concert.city)" class="ml-2 cursor-pointer">
                        <TableBadge :label="concert.city" variant="outline" />
                    </span>
                    <TableBadge class="ml-2 mr-2" :label="concert.source"/>
                    <span v-for="(composer, index) in concert.composers" :key="composer.id" class="inline-block">
                      <span v-if="index > 0" class="text-gray-500">, </span>
                        <span class="text-sm text-gray-500 font-medium hover:underline cursor-pointer" @click="addComposer(composer.name)">
                            {{ formatComposerName(composer.name) }}
                        </span>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
  </template>
  
  <script setup>

  const route = useRoute()
  const props = defineProps({
    concerts: {
      type: Array,
      required: true
    },
    addComposer: {
      type: Function,
      required: true
    },
    selectCity: {
      type: Function,
      required: true
    }
  })  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sk-SK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatComposerName = (composerName) => {
    const parts = composerName.split(' ')
    return parts[parts.length - 1]
  }
  
  const formatTime = (timeFrom, timeTo) => {
      if (timeFrom && timeTo) {
          return timeFrom.slice(0, 5) + ' - ' + timeTo.slice(0, 5)
      } else if (timeFrom) {
          return timeFrom.slice(0, 5)
      } else if (timeTo) {
          return timeTo.slice(0, 5)
      }
  }
  </script>
  
  <style>
  /* Add custom styles if needed */
  </style> 