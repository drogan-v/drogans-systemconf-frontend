<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref([])

async function loadProducts() {
  try {
    const response = await fetch('https://g40sl192-8000.euw.devtunnels.ms/item')
    const data = await response.json()
    products.value = Array.isArray(data) ? data : [data]
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  }
}

onMounted(loadProducts)
</script>

<template>
  <div class="store">
    <ProductCard
      v-for="prod in products"
      :key="prod.item_id"
      :id="prod.item_id"
      :price="prod.item_price"
      :title="prod.item_name"
      :description="prod.item_description"
      :image="''"
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
