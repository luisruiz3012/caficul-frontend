import { defineStore } from "pinia";
import { ref } from "vue";

export const useMarketStore = defineStore('market', () => {
  const currency = ref('');

  const setCurrency = (value: string) => {
    currency.value = value
  }

  return { currency, setCurrency }
})
