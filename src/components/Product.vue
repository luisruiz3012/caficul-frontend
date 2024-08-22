<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useMarketStore } from '../stores/market.ts';

const store = useCartStore();
const market = useMarketStore();
const props = defineProps(['product']);


const clicked = ref(false);

const addProductToCart = () => {
  if (clicked.value == false) {
    store.addProduct(props.product)
    clicked.value = true;
  } else {
    store.removeFromCart(props.product)
    clicked.value = false;
  }
}

</script>

<template>
  <figure class="border border-gray-400 p-2 rounded-lg">
    <img :src="props.product.image" class="w-56 h-36 rounded-t-lg" />
    <div class="my-5 px-2">
      <p class="font-semibold">{{ product.name }}</p>
      <p><b>Price</b> {{ product.price * 1000 }} {{ !market.currency ? 'CFL' : market.currency }}</p>
      <button class="text-sm bg-black text-white px-4 py-2 rounded-lg mt-4"
      @click="(addProductToCart)"
      >Add to cart</button>
    </div>
  </figure>

</template>