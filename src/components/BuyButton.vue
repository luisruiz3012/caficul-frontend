<script setup lang="ts">
import { useMarketStore } from '../stores/market';
import { useCartStore } from '../stores/cart';
import { useWalletStore } from '../stores/wallet';
import { web, ITransfer, TransactionType } from '@klever/sdk-web';

const props = defineProps(['price', 'wallet', 'order', 'name', 'address']);
const market = useMarketStore();
const cart = useCartStore();
const wallet = useWalletStore();


const sendPayment = async () => {
  const payload: ITransfer = {
    amount: props.price * (market.currency == 'KLV' ? 1000000 : 1),
    receiver: props.wallet,
    kda: !market.currency ? 'CFL-16IP' : market.currency,
  }

  try {
    const unsignedTx = await web.buildTransaction([{payload, type: TransactionType.Transfer}], [], { kdaFee: market.currency == 'CFL' || !market.currency ? 'CFL-16IP' : market.currency })

    const signedTx = await web.signTransaction(unsignedTx)

    const response = await web.broadcastTransactions([signedTx])
  
    if (response) {
      fetch(import.meta.env.VITE_API_ORDERS, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(props.order)
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          cart.clearCart();
          wallet.setOrderPlaced
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <button :disabled="name && address ? false : true" :class="`text-white ${name && address ? 'bg-black' : 'bg-gray-600'} px-6 py-3 text-xs mt-2 rounded-lg`" @click="sendPayment">
    Buy now
  </button>
</template>