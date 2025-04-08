<template>
    <template v-if="data">
        <div class="max-w-3xl mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold mb-4">{{ data.title }}</h1>
            <p class="date">{{ new Date(data.date).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
            <ContentRenderer :value="data" />
        </div>
    </template>
    <template v-else>
        <div class="empty-page">
            <h1>Oops!</h1>
            <p>Nič tu nie je :/</p>
            <NuxtLink to="/">Domov</NuxtLink>
        </div>
    </template>
</template>

<script setup>
const route = useRoute()
const { data } = await useAsyncData(() => queryCollection('content').path(`/${route.params.slug}`).first())

definePageMeta({
    layout: 'blog',
})

useSeoMeta({
  title: data.value?.title,
//   description: data.value?.description
})

useHead({
    title: data.value?.title,
})
</script>

<style scoped>

.date {
    margin-bottom: 2rem;
    color: #666;
}

.content p {
    line-height: 1.6;
    margin-bottom: 1rem;
}

.code-block {
    overflow-y: auto;
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    padding: 0 1rem;
}

.code-block code {
    display: block;
    white-space: pre;
    font-family: monospace;
}
</style>
