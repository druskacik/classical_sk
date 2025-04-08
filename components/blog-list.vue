<template>
    <ul class="list-none p-0 mt-4">
        <li v-for="article in articles" :key="article.id" class="mb-4">
            <div class="mb-1" >{{ article.date }}</div>
            <NuxtLink :to="`/blog/${article.slug}`" class="text-blue-500 hover:underline">{{ article.title }}</NuxtLink>
        </li>
    </ul>
</template>

<script setup>

const { data } = await useAsyncData(() => queryCollection('content').order('date', 'DESC').all())

const articles = data.value.map(article => ({
    id: article.id,
    slug: article.stem,
    title: article.title,
    date: new Date(article.date).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' })
}))

</script>