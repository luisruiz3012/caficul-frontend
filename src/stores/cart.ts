import { computed } from '@vue/reactivity';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const products = ref([]);
  const orderProducts = ref([]);

  const cartLength = computed(() => products.value.length);
  const showCart = ref(false);
  const total = ref(0);

  function displayCart(): void {
    showCart.value = !showCart.value
  }

  function removeFromCart(product: any): void {
    total.value = total.value - product.price
    products.value = products.value.filter(item => item.id !== product.id);

    if (products.value.length === 0) {
      total.value = 0;
    }
  }
      
  function addProduct(product: any): void {
    const newProduct: any = {
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      token: product.token,
      wallet: product.wallet,
      image: product.image,
      quantity: 1
      }

      orderProducts.value.push(product);
      products.value.push(newProduct);
      
      total.value = total.value + product.price
    }
      
    function updateQuantity(product: any, quantity: any): void {
      product.quantity = quantity
    }

    function clearCart(): void {
      products.value = [];
      orderProducts.value = [];
    }
    
    return { orderProducts, products, addProduct, cartLength, showCart, displayCart, total, updateQuantity, removeFromCart, clearCart};
})