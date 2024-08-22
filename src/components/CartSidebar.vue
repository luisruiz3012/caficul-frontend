<script lang="ts" setup>
import { useCartStore } from '../stores/cart';
import CartProduct from './CartProduct.vue'
import { useMarketStore } from '../stores/market';

const store = useCartStore();
const market = useMarketStore();

</script>

<template>
<section v-show="store.showCart" class="bg-white w-full lg:w-1/4 shadow-lg flex h-full border-l border-gray-300 fixed top-24 right-0 p-10 flex-col items-center gap-4">
  <div class="relative h-[210%] flex flex-col gap-4">
    <div class="h-96 flex flex-col gap-4 overflow-auto">
      <CartProduct v-for="p in store.products" :product="p" />
    </div>
    <p class="font-semibold text-center text-lg">
      Total:
      {{ (store.total * 1000).toFixed(2) + ` ${!market.currency ? 'CFL' : market.currency}` }}
    </p>
    <!-- <BuyButton :price="0.06" :wallet="'klv1rk7dq0rd5af93cgpe7r9q4zff3n2vfnxfn2kdv5pt0amghtl6pcscr25vt'" /> -->

    <RouterLink to="/checkout" class="bg-black text-white px-6 py-2 rounded-lg text-center">Go To Checkout</RouterLink>
  </div>
</section>
</template>