<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref([])

const cart = ref([])

async function loadProducts() {
  try {
    const response = await fetch('https://g40sl192-8000.euw.devtunnels.ms/item')
    const data = await response.json()
    products.value = Array.isArray(data) ? data : [data]
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  }
}

const updateCart = (item) => {
  const index = cart.value.findIndex((cartItem) => cartItem.id === item.id)
  if (index !== -1) {
    if (item.quantity > 0) {
      cart.value[index].quantity = item.quantity
    } else {
      cart.value.splice(index, 1)
    }
  } else {
    if (item.quantity > 0) {
      cart.value.push({ id: item.id, quantity: item.quantity })
    }
  }
}

const createInvoice = async () => {
  if (!window.Telegram?.WebApp) return

  const tg = window.Telegram.WebApp

  try {
    const response = await fetch('https://g40sl192-8000.euw.devtunnels.ms/make_invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Telegram-WebApp-InitData': tg.initData,
      },
      body: JSON.stringify({
        items: cart.value,
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
      @change-cart="(item) => updateCart(item)"
    />
    <div class="btn-wrapper">
      <button class="buy" @click="createInvoice">Купить</button>
    </div>
  </div>
</template>

<style scoped>
.store {
  display: flex;
  flex-wrap: wrap; /* 👈 Позволяет переносить элементы на новую строку */
  gap: 12px; /* Отступ между карточками */
  padding: 12px;
  padding-bottom: 80px; /* 60px (высота кнопки) + 20px (отступ кнопки от низа) */
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}

.buy {
  width: 80%;
  position: fixed;
  background-color: rgb(4, 235, 81);
  color: var(--tg-theme-text-color);
  font-size: large;
  font-weight: 700;
  border: 0;
  bottom: 20px; /* Добавим небольшой отступ от самого низа */
  left: 50%; /* Смещаем в центр */
  transform: translateX(-50%); /* Корректируем положение точно по центру */
  height: 60px;
  border-radius: 8px; /* Скругляем углы (половина высоты для овальной формы) */
  max-width: 500px; /* Ограничим максимальную ширину для больших экранов */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Меняем курсор при наведении */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Небольшая тень для объема */
}
</style>
