<script setup lang="ts">
import { defineProps, ref } from 'vue';

defineProps(['order']);

const details = ref(false);

const showDetails = () => {
  details.value = !details.value;
}
</script>

<template>
  <article class="bg-gray-200 p-4 rounded-lg my-4 flex flex-col cursor-pointer" @click="showDetails">
    <section class="my-1 flex items-center justify-between p-4 rounded-lg">
      <div>
        <b>Order:</b>
        <h3>{{ order._id }}</h3>
      </div>
      <div class="flex items-center justify-center gap-4">
        <b>{{ order.status }}</b>
        <div class="flex items-center justify-center mb-4 text-3xl">
          ...
        </div>
      </div>
    </section>

    <section class="p-4" v-show="details">
      <h3 class="mb-4 text-lg font-bold">Order Details</h3>
      
      <div class="flex justify-center items-center">
        <div class="w-2/3 flex flex-col">
          <p class="my-1"><span class="text-gray-600 font-semibold">Customer's name:</span> {{ order.firstName + ' ' + order.lastName }}</p>

          <p class="my-1"><span class="text-gray-600 font-semibold">Customer's email:</span> {{ order.email }}</p>
          
          <p class="my-1"><span class="text-gray-600 font-semibold">Customer's address:</span> {{ order.address }}</p>
        </div>
        <div class="w-1/3">
          <div v-for="p in order.products" class="flex items-center justify-between w-full">
            <p class="my-2 text-gray-600 font-medium">{{ p.name }}</p>
            <p>{{ p.price  }} {{ order.token == 'CFL-16IP' ? 'CFL' : order.token }}</p>
          </div>
          <hr class="my-2 border border-gray-400" />
          <div class="flex items-center justify-between w-full">
            <p class="my-2 text-gray-600 font-medium">Total</p>
            <p>{{ order.total }} {{ order.token == 'CFL-16IP' ? 'CFL' : order.token }}</p>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
