<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
#app {
font-family: 'Lato', sans-serif;
}
</style>

<script setup lang="ts">
const cities = useState('cities')
const composers = useState('composers')

await callOnce(async () => {
  cities.value = await $fetch('/api/get-cities')
  composers.value = await $fetch('/api/get-composers')
})
</script>