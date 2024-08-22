import { computed } from '@vue/reactivity';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Product {
  _id: any;
  name: any;
  description: any;
  category: any;
  price: any;
  token: any;
  wallet: any;
  image: any;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const products = ref<Product[]>([]);
  const orderProducts = ref<Product[]>([]);

  const cartLength = computed(() => products.value.length);
  const showCart = ref(false);
  const total = ref(0);

  function displayCart(): void {
    showCart.value = !showCart.value
  }

  function removeFromCart(product: Product): void {
    // Subtract the product's price from the total
    total.value = total.value - product.price;
  
    // Filter out the product from the products array
    products.value = products.value.filter(item => item._id !== product._id);
  
    // Reset total to 0 if there are no products left in the cart
    if (products.value.length === 0) {
      total.value = 0;
    }
  }
      
  function addProduct(product: Product): void {
    const newProduct: Product = {
      _id: product._id,
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