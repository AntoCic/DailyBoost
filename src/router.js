import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './view/pages/HomeView.vue'
import ContactView from './view/pages/ContactView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/contact', component: ContactView },
  ],
})