<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import MarketHeader from '../components/MarketHeader.vue';
import OrderComponent from '../components/OrderComponent.vue';
import {useWalletStore} from '../stores/wallet';

const orders = ref([]);
const wallet = useWalletStore();

onBeforeMount(() => {
  let wall = localStorage.getItem('wallet');

  fetch(`${import.meta.env.VITE_API_GET_ORDERS_URL}${wall}`)
  .then(res => res.json())
  .then(res => {
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
