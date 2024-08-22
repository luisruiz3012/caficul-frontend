<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useMarketStore } from '../stores/market';

const props = defineProps(["product"]);
const quantity = ref(1);

const store = useCartStore();
const market = useMarketStore();
</script>

<template>
  <figure class="flex w-full border relative border-gray-400 rounded-lg px-2 py-2 gap-4 bg-white">
    <img :src="props.product.image" class="w-20 h-20 border border-gray-400 rounded-lg" />
    <div>
      <h3 class="font-semibold">{{ props.product.name }}</h3>
      <p class="font-semibold text-xs">{{ (props.product.price * 1000) * quantity }} {{ !market.currency ? 'CFL' : market.currency }}</p>
      <input type="number" class="w-1/3 border border-gray-400 text-center rounded-lg mt-2 px-1 text-xs" v-model="quantity" @change="console.log('Hola')" />
    </div>

    <div class="absolute top-8 text-red-600 font-bold cursor-pointer right-4" @click="() => store.removeFromCart(product)">x</div>
  </figure>
</template>