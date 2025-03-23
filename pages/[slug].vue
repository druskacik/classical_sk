<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-serif mb-8 text-center">Koncerty klasickej hudby na Slovensku</h1>
    <ComposersFilter :composers="composers" :selectedComposers="selectedComposers" @update:composers="updateSelectedComposers" />
    <!-- Existing concert listings -->
    <div v-if="status === 'pending'">
      <UProgress indeterminate animation="swing"/>
    </div>
    <div v-else-if="status === 'error'">
      <UAlert color="error">
        {{ error }}
      </UAlert>
    </div>
    <div v-else-if="status === 'success'">
      <div class="container mx-auto py-8 px-4">
        <div v-for="(concertGroup, month) in groupedConcerts" :key="month" class="mb-8">
          <h2 class="text-2xl font-serif mb-4 capitalize">{{ month }}</h2>
          <ConcertsTable :concerts="concertGroup" :addComposer="addComposer" :selectCity="selectCity" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const route = useRoute()
const router = useRouter()
const slug = route.params.slug

useHead({
    title: `Klasická hudba ${slug}`,
})

const selectedComposers = ref(
  route.query.skladatelia ? route.query.skladatelia.split(',') : []
)

const { data: concerts, status, error, refresh } = await useAsyncData(
  'concerts',
  () => useRequestFetch()('/api/get-concerts', {
      method: 'GET',
      params: {
        city: slug,
        composers: selectedComposers.value.length ? selectedComposers.value.join(',') : undefined,
      }
    }),
    {
      watch: [selectedComposers]
    })
const { data: composers } = await useAsyncData('composers', () => $fetch('/api/get-composers'))

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

const updateSelectedComposers = (composers) => {
  selectedComposers.value = composers
  router.push({
      query: {
        ...route.query,
        skladatelia: composers.length ? composers.join(',') : undefined
      }
    })
  refresh()
}

const addComposer = (composer) => {
  if (selectedComposers.value.includes(composer)) {
    return
  }
  selectedComposers.value.push(composer)
  updateSelectedComposers(selectedComposers.value)
  router.push({
      query: {
        ...route.query,
        skladatelia: selectedComposers.value.join(',')
      }
    })
  refresh()
}

const selectCity = (city) => {
  navigateTo({
    path: `/${city}`,
    query: {
      skladatelia: selectedComposers.value.length ? selectedComposers.value.join(',') : undefined
    }
  })
}
</script>

<style>
/* Add custom styles if needed */
</style> 