<script lang="ts" setup>
import { useMarketStore } from '../stores/market.ts'

const market = useMarketStore();
</script>

<template>
  <div class="mt-10">
    <label for="currency">Display currency:</label>

    <select name="currency" id="currency" class="bg-gray-100 px-4 py-1 ml-2 rounded-md border border-lime-600" @change="(e) => market.setCurrency(e.target.value)">
      <option value="CFL" :selected="market.currency === 'CFL'">$CFL</option>
      <option value="KLV" :selected="market.currency === 'KLV'">$KLV</option>
      <!-- <option value="USDT">$USDT</option> -->
    </select>
  </div>
</template>