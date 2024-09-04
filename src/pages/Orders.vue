<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import MarketHeader from '../components/MarketHeader.vue';
import OrderComponent from '../components/OrderComponent.vue';

const orders = ref([]);

onBeforeMount(() => {
  let wall = localStorage.getItem('wallet');

  fetch(`${import.meta.env.VITE_API_GET_ORDERS_URL}${wall}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    orders.value = res
  })
})
</script>

<template>
  <section>
    <MarketHeader />
    <div class="mt-24 px-20 py-16">
      <h3 class="text-5xl font-semibold mb-10">My orders</h3>
      <OrderComponent v-for="order in orders" :order="order" />
    </div>
  </section>
</template>
