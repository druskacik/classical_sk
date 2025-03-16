<template>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
            <tbody class="divide-y divide-gray-200">
            <tr v-for="concert in concerts" :key="concert.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-900">
                <span class="hidden lg:block">{{ formatDate(concert.date) }}</span>
                <span class="lg:hidden">{{ formatDateShort(concert.date) }}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 font-medium">
                    <a :href="concert.url" target="_blank" rel="noopener noreferrer" class="hover:underline">{{ concert.title }}</a>
                    <TableBadge class="ml-2" :label="concert.city" variant="subtle" />
                    <TableBadge class="ml-2" :label="concert.source" />
                </td>
                <!-- <td class="px-6 py-4 text-sm text-gray-900">{{ concert.venue }}</td> -->
                <!-- <td class="px-6 py-4 text-sm text-gray-900">{{ formatTime(concert.time_from, concert.time_to) }}</td> -->
            </tr>
            </tbody>
        </table>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    concerts: {
      type: Array,
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
  
  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString('sk-SK', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
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