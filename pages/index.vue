<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-serif mb-8 text-center">Koncerty klasickej hudby na Slovensku</h1>
    <div class="container mx-auto py-8 px-4">
      <div v-for="(concertGroup, month) in groupedConcerts" :key="month" class="mb-8">
        <h2 class="text-2xl font-serif mb-4 capitalize">{{ month }}</h2>
        <ConcertsTable :concerts="concertGroup" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: concerts } = await useFetch('/api/get-concerts')

// Group concerts by month
const groupedConcerts = computed(() => {
  if (!concerts.value) return {}
  
  return concerts.value.reduce((acc, concert) => {
    const date = new Date(concert.date)
    const month = date.toLocaleString('sk-SK', { month: 'long', year: 'numeric' })
    
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(concert)
    return acc
  }, {})
})
</script>

<style>
/* Add custom styles if needed */
</style> 