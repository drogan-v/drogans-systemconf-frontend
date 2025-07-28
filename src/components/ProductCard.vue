<script setup lang="ts">
import { defineProps, ref } from 'vue'
const props = defineProps({
  id: Number,
  title: String,
  description: String,
  price: Number,
  image: String,
})

const isLoading = ref(false)

const createInvoice = async () => {
  if (!window.Telegram?.WebApp) return

  isLoading.value = true
  const tg = window.Telegram.WebApp

  try {
    const response = await fetch('https://g40sl192-8000.euw.devtunnels.ms/make_invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Telegram-WebApp-InitData': tg.initData,
      },
      body: JSON.stringify({
        item_id: props.id,
        item_name: props.title,
        item_price: props.price,
        item_description: props.description,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Ошибка создания заказа')
    }

    const { invoice_link } = await response.json()
    tg.openInvoice(invoice_link)
  } catch (error) {
    tg.showAlert(error.message || 'Ошибка при создании заказа')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="card">
    <img :src="image" alt="" class="card-image" />
    <div class="card-body">
      <span class="card-title">{{ title }}</span>
      <span class="card-price">{{ price }} ₽</span>
      <button class="card-buy-btn" @click="createInvoice" :disabled="isLoading">Buy</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.card-image {
  height: 100px;
  width: 100px;
}
.card-footer {
  display: block;
}
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding-top: 8px;
  box-sizing: border-box;
}
.card-buy-btn {
  display: block;
  margin: 5px auto 0;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  height: 30px;
  width: 70px;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
  cursor: pointer;
}
</style>
