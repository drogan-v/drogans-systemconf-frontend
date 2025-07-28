<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  price: Number,
  image: String,
})

const isLoading = ref(false)
const quantity = ref(0)

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
      body: JSON.stringify([
        {
          item_id: props.id,
          item_name: props.title,
          item_price: props.price,
          item_description: props.description,
          quantity: quantity.value,
        },
      ]),
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

const increment = () => quantity.value++
const decrement = () => quantity.value > 0 && quantity.value--
</script>

<template>
  <div class="product-card">
    <div class="image-wrapper">
      <img :src="image" :alt="title" class="product-image" loading="lazy" />
      <span v-if="quantity > 0" class="quantity-badge">
        {{ quantity }}
      </span>
    </div>

    <div class="product-info">
      <h3 class="product-title">{{ title }}</h3>
      <p class="product-price">{{ price }} ₽</p>

      <div class="product-actions">
        <button v-if="quantity === 0" class="buy-button" @click="increment" :disabled="isLoading">
          Купить
        </button>

        <div v-else class="quantity-controls">
          <button class="control-button minus" @click="decrement" :disabled="isLoading">−</button>
          <button class="control-button plus" @click="increment" :disabled="isLoading">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  --button-color: var(--tg-theme-button-color);
  --button-text: var(--tg-theme-button-text-color);
  --bg-color: var(--tg-theme-secondary-bg-color);
  --text-color: var(--tg-theme-text-color);
  --danger-color: #fc4a4a;

  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;
}

.image-wrapper {
  position: relative;
  align-self: center;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
}

.quantity-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--button-color);
  color: var(--button-text);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
}

.product-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: var(--button-color);
}

.product-actions {
  margin-top: 8px;
}

.buy-button {
  background: var(--button-color);
  color: var(--button-text);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.buy-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.quantity-controls {
  display: flex;
  gap: 8px;
}

.control-button {
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.control-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.control-button.plus {
  background: var(--button-color);
  color: var(--button-text);
}

.control-button.minus {
  background: var(--danger-color);
  color: white;
}
</style>
