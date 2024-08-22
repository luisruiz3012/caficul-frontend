import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.ts';

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoCart, MdKeyboardarrowdownSharp } from "oh-vue-icons/icons";
import { createPinia } from 'pinia';

addIcons(CoCart, MdKeyboardarrowdownSharp);

const pinia = createPinia();

createApp(App)
.use(pinia)
.use(router)
.component("v-icon", OhVueIcon)
.mount('#app')
