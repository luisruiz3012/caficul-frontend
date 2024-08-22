<script setup lang="ts">
import ConnectButton from './ConnectButton.vue';
import { useCartStore } from '../stores/cart';
import { useWalletStore } from '../stores/wallet';

const store = useCartStore();
const wallet = useWalletStore();

</script>

<template>
  <nav class="flex items-center justify-between px-10 py-3 shadow-lg fixed top-0 left-0 right-0 z-10 bg-white flex-row">
    <RouterLink to="/marketplace"><img src="../assets/logo.png" class="w-16 md:w-20" /></RouterLink>
    <div class="items-center gap-2 flex justify-center flex-row">
      <RouterLink :class="`px-8 py-3 flex bg-lime-500 text-white rounded-lg text-sm ${wallet.wallet === '' && 'hidden'}`" to="/orders">My orders</RouterLink>
      <div class="flex items-center justify-center lg:flex-row">
        <ConnectButton />
        <div class="relative cursor-pointer" @click="store.displayCart">
          <v-icon name="co-cart" scale="1.5" />
          <div class="text-xs absolute top-0 left-5 bg-lime-600 text-white w-4 h-4 max-h-full text-center rounded-full">{{ store.cartLength }}</div>
        </div>
      </div>
    </div>
  </nav>
</template>