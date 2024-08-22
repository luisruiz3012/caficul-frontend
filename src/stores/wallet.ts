import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWalletStore = defineStore('wallet', () => {
  const wallet = ref('');
  const orderPlaced = ref(false);

  const setWallet = (wlt: string) => {
    wallet.value = wlt;
  }

  const setOrderPlaced = () => {
    orderPlaced.value = !orderPlaced.value;
  }

  return { wallet, setWallet, orderPlaced, setOrderPlaced };
})