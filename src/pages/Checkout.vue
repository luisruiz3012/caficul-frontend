<script setup lang="ts">
import { computed, ref } from 'vue';
import BuyButton from '../components/BuyButton.vue';
import CurrencyDropdown from '../components/CurrencyDropdown.vue'
import { useCartStore } from '../stores/cart';
import { useWalletStore } from '../stores/wallet';
import { useMarketStore } from '../stores/market'; 

const store = useCartStore();
const wallet = useWalletStore();
const market = useMarketStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const address = ref('');

const order = computed(() => {
  return {
    'firstName': firstName.value,
    'lastName': lastName.value,
    'email': email.value,
    'address': address.value,
    'products': store.orderProducts,
    'token': !market.currency ? 'CFL-16IP' : market.currency,
    'total': store.total,
    'buyerWallet': wallet.wallet,
  }
})

</script>

<template>
  <nav class="px-10 py-4 flex items-center justify-between shadow-md border-b border-gray-100">
    <RouterLink to="/marketplace" class="font-semibold text-lg hover:underline">Go back</RouterLink>
    <div class="flex items-center gap-6 justify-center">
      <RouterLink class="px-8 py-3 bg-lime-500 text-white rounded-lg text-sm" to="/orders">My orders</RouterLink>
      <img src="../assets/logo.png" class="w-20" />
    </div>
  </nav>
  <div class="w-fit h-10 shadow-md flex items-center gap-5 justify-center text-white font-semibold bg-lime-400 pl-5 pr-4 py-2 m-5 ml-auto rounded-lg" v-show="wallet.orderPlaced">
    <p>Order placed successfully</p>
    <div class="text-lg text-white cursor-pointer" @click="wallet.setOrderPlaced()">x</div>
  </div>
  <section class="flex">
    <div class="w-2/3 p-10">
      <p class="text-4xl mb-5 font-semibold">Delivery Information</p>

      <CurrencyDropdown />
      
      <form class="flex gap-4 text-lg flex-col mt-8" @submit.prevent="">
        <div class="flex flex-col gap-1">
          <label>Email address:</label>
          <input type="email" v-model="email" required name="last name" placeholder="Enter your email" class="border border-gray-400 px-2 rounded-sm h-10" />
        </div>

        <div class="flex gap-4">
          <div class="flex flex-col gap-1 w-1/3">
            <label>Firstname:</label>
            <input type="text" v-model="firstName" name="first name" placeholder="Enter your first name" class="border border-gray-400 px-2 rounded-sm h-10" required/>
          </div>
          <div class="flex flex-col gap-1 w-1/3">
            <label>Last name:</label>
            <input type="text" v-model="lastName" name="last name" placeholder="Enter your last name" class="border border-gray-400 px-2 rounded-sm h-10" required />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label>Delivery address:</label>
          <input type="text" v-model="address" name="Delivery address" placeholder="Enter your delivery address" class="border border-gray-400 px-2 rounded-sm h-10" required/>
        </div>

        <BuyButton :name="order.firstName" :address="order.address" :price="store.total * 10 ** 3" 
        :order="order"
        :wallet="wallet.wallet" @click="wallet.setOrderPlaced()"/>
      </form>
    </div>
    <div class="w-1/3 p-10">
      <p class="text-2xl mb-5 font-semibold">Order Summary</p>
      <div class="p-10 flex flex-col gap-2 bg-gray-100 rounded-lg border border-gray-300 shadow-lg">
        <div class="flex flex-col gap-2 bg-gray-100 rounded-lg h-48 overflow-auto">
          <figure v-for="p in store.products" class="flex items-center justify-between">
          <p class="text-gray-600 font-medium">{{ p.name }} x {{ p.quantity }}</p>
          <p class="text-gray-600 font-medium">{{ p.price * 1000 }} {{ !market.currency ? 'CFL' : market.currency }}</p>
        </figure>
        </div>

        <hr class="border border-gray-300 my-5" />

        <div class="flex items-center justify-between font-medium text-gray-600">
          <p>Total</p>
          <p class="text-lg font-bold text-gray-800">{{ (store.total * 1000).toFixed(2) }} {{ !market.currency ? 'CFL' : market.currency }}</p>
        </div>
      </div>
    </div>
  </section>
</template>