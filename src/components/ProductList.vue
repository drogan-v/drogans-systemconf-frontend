<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'
const products = ref([
  {
    id: 1,
    title: 'Смарт-часы',
    description: 'Умные часы с пульсометром',
    price: 5990,
    image:
      'https://avatars.mds.yandex.net/get-mpic/7653749/2a00000197c16307f17f363a58b9bdad3440/optimize',
  },
  {
    id: 2,
    title: 'Наушники',
    description: 'Беспроводные с шумоподавлением',
    price: 7990,
    image:
      'https://avatars.mds.yandex.net/get-mpic/16441222/2a000001971a3cfae67d10362aba029ad6c2/optimize',
  },
  {
    id: 3,
    title: 'RX 580',
    description: 'Мощная сладкая',
    price: 15000,
    image:
      'https://avatars.mds.yandex.net/get-mpic/15492377/2a000001971fd70f6d30b1a66d377371fb2b/900x1200',
  },
  {
    id: 4,
    title: 'Айфон 16',
    description: 'Каеф',
    price: 60000,
    image: 'https://n.cdn.cdek.shopping/images/shopping/5bfec600324f417c9cc20136602d5e39.jpg?v=1',
  },
])
</script>

<template>
  <div class="store">
    <ProductCard
      v-for="prod in products"
      :key="prod.id"
      :id="prod.id"
      :price="prod.price"
      :title="prod.title"
      :description="prod.description"
      :image="prod.image"
    />
  </div>
</template>

<style scoped>
.store {
  display: flex;
  flex-wrap: wrap; /* 👈 Позволяет переносить элементы на новую строку */
  gap: 12px; /* Отступ между карточками */
  padding: 12px;
}
</style>
