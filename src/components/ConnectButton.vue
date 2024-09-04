<script setup lang="ts">
import { IProvider, web } from '@klever/sdk-web';
import { onBeforeMount, ref } from 'vue';
import { useWalletStore } from '../stores/wallet';

const connected = ref(false);
const wallet = ref('');

const walletStore = useWalletStore();

onBeforeMount(() => {
  const localWallet = localStorage.getItem('wallet');

  if (localWallet) {
    wallet.value = localWallet
    walletStore.setWallet(localWallet);
  }
})

const provider: IProvider = {
    api: 'https://api.mainnet.klever.finance',
    node: 'https://node.mainnet.klever.finance',
  }
  
  web.setProvider(provider);

  const connectWallet = async () => {
    await web.initialize()
    const w = await web.getWalletAddress();
    connected.value = true;

    walletStore.setWallet(w);
    localStorage.setItem('wallet', w);

    fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify({ wallet: w }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('token', res);
    })
  }
</script>

<template>
  <button v-if="!connected" @click="connectWallet" class="m-5 bg-black px-6 py-3 text-white rounded-lg lg:text-sm text-center text-xs">
    {{ wallet && connected ? "" : "Connect wallet" }}
  </button>

  <p v-if="wallet && connected" class="mr-5 hidden lg:flex items-center gap-2 justify-center bg-gray-200 px-6 py-2 rounded-lg"><div class="bg-lime-600 h-2 w-2 rounded-full"></div>{{ walletStore.wallet.slice(0,5) }}...{{ wallet.slice(16,21) }}</p>
</template>