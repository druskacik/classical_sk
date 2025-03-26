<template>
    <div class="container mx-auto py-8 px-4 md:px-8 lg:px-12">
        <h1 class="text-3xl font-serif mb-8 text-center">Zdroje</h1>
        <div v-for="(sourceList, city) in sources" :key="city" class="mb-6">
            <h2 class="text-2xl font-serif mb-4">
                {{ city }}
            </h2>
            <div class="pl-6">
                <div v-for="source in sourceList" :key="source.name" class="mb-2">
                    <a :href="source.url" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
                        {{ source.name }}
                    </a>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  
  useHead({
      title: 'Klasická hudba na Slovensku - zdroje',
  })

  const sources = ref({
    'Celé Slovensko': [
      {
        name: 'Ticketportal.sk',
        url: 'https://www.ticketportal.sk',
      },
      {
        name: 'GoOut',
        url: 'https://goout.net',
      },
      {
        name: 'tootoot',
        url: 'https://tootoot.fm',
      }
    ],
    'Bratislava': [
      {
        name: 'Slovenská filharmónia',
        url: 'http://www.filharmonia.sk',
      },
      {
        name: 'Slovenské národné divadlo',
        url: 'https://snd.sk',
      },
      {
        name: 'Konvergencie',
        url: 'https://www.konvergencie.sk',
      },
      {
        name: 'Dom kultúry Ružinov',
        url: 'https://www.cultusruzinov.sk/',
      },
      {
        name: 'Slovenská televízia a rozhlas',
        url: 'https://www.stvr.sk/',
      },
    ],
    'Košice': [
      {
        name: 'Národné divadlo Košice',
        url: 'https://www.sdke.sk',
      },
      {
        name: 'Štátna filharmónia Košice',
        url: 'https://www.sfk.sk',
      }
    ],
    'Žilina': [
      {
        name: 'Štátny komorný orchester Žilina',
        url: 'https://skozilina.sk',
      }
    ],
    'Banská Bystrica': [
      {
        name: 'Štátna opera',
        url: 'https://www.stateopera.sk',
      }
    ],
    'Trnava': [
      {
        name: 'Zaži v Trnave',
        url: 'https://kultura.trnava.sk',
      }
    ],
    'Trenčín': [
      {
        name: 'Klub priateľov vážnej hudby',
        url: 'https://www.kpvh.sk',
      },
    ],
    'Ružomberok': [
      {
        name: 'Simachart',
        url: 'https://simachart.weebly.com',
      }
    ]
  })
  </script>
  
  <style>
  /* Add custom styles if needed */
  </style> 