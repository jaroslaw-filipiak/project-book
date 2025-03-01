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
      redirect: '/kreator/postacie',
    },
    {
      path: '/kreator/postacie',
      name: 'characters',
      component: () => import('../views/creator/CharactersView.vue'),
      meta: { title: 'Create Characters' }
    },
    {
      path: '/kreator/historia',
      name: 'story',
      component: () => import('../views/creator/StoryView.vue'),
      meta: { title: 'Create Story' }
    },
    {
      path: '/kreator/strony',
      name: 'pages',
      component: () => import('../views/creator/PagesView.vue'),
      meta: { title: 'Design Pages' }
    },
    {
      path: '/kreator/podsumowanie',
      name: 'summary',
      component: () => import('../views/creator/SummaryView.vue'),
      meta: { title: 'Book Summary' }
    },
  ],
})

export default router
