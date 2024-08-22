<script setup lang="ts">
import MarketplaceLayout from '../layouts/MarketplaceLayout.vue';
import Product from '../components/Product.vue';
import CurrencyDropdown from '../components/CurrencyDropdown.vue'
import { useMarketStore } from '../stores/market';
import { onBeforeMount, ref } from 'vue';

const products = ref([]);
const loading = ref(true);
const market = useMarketStore();

onBeforeMount(() => {
  fetch('https://caficul-backend.onrender.com/api/products')
  .then((res) => res.json())
  .then(res => {
    products.value = res
    loading.value = false
  });

  market.setCurrency(market.currency);
})
</script>

<template>
  <MarketplaceLayout>
    <section :class="`p-10 md:p-4 ${loading && 'h-screen'} flex flex-wrap flex-col justify-center items-center mx-auto flex-center`">
      <p v-if="loading" class="text-3xl">Loading...</p>
      <CurrencyDropdown v-show="loading == false" />
      <section v-show="loading == false" class="p-10 w-full flex flex-wrap items-center mx-auto flex-center justify-center gap-2">
        <Product v-for="p in products" :product="p" />
      </section>
    </section>
  </MarketplaceLayout>
</template>
