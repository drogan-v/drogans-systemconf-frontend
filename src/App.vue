<script setup lang="ts">
import ProductList from './components/ProductList.vue'
</script>

<template>
  <header></header>
  <main>
    <ProductList />
  </main>
</template>

<style scoped>
.btn {
  border: 0;
  border-radius: 5px;
  margin-top: 50px;
  height: 60px;
  width: 200px;
  font-style: 20px;
  font-weight: 500;
  cursor: pointer;
  color: var(--tg-theme-button-text-color);
  background: var(--tg-theme-button-color);
}
</style>
