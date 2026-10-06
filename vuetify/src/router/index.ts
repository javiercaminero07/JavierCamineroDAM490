/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue';
import MenuNotas from '@/pages/menunotas.vue'
import Nota from '@/components/Nota.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/papapa',
      component: App,
    },
    {
      path: '/',
      component: MenuNotas,
    },
    {
      path: '/nota/:id',
      name: 'nota',
      component: Nota,
    },
  ],
})

export default router
