<script setup lang="ts">
import MarketHeader from './../components/MarketHeader.vue';
import Footer from './../components/Footer.vue';
import CartSidebar from './../components/CartSidebar.vue'
</script>

<template>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caficul | Marketplace</title>
  </head>
  <body class="min-h-screen absolute w-full">
    <MarketHeader />
    <div class="relative mt-24">
      <slot />
      <CartSidebar />
    </div>
    <Footer />
  </body>
  </html>
</template>