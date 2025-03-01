import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/jak-to-dziala',
      name: 'how-it-works',
      component: () => import('../views/HowItWorksView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQView.vue'),
    },
    {
      path: '/o-nas',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/kreator',
      name: 'book-creator',
      component: () => import('../views/CreatorView.vue'),
    },
  ],
})

export default router
