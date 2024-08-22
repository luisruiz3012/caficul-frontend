import  { createRouter, createWebHistory } from 'vue-router';
import Marketplace from './../pages/Marketplace.vue';
import Homepage from '../pages/Homepage.vue';
import Checkout from '../pages/Checkout.vue';
import Orders from '../pages/Orders.vue';

const routes = [
  { path: '/', component: Homepage },
  { path: '/marketplace', component: Marketplace },
  { path: '/checkout', component: Checkout },
  { path: '/orders', component: Orders },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;