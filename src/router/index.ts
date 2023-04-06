import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/tabs',
      name: 'Tabs',
      component: () => import('@/views/tabs/TabsView.vue'),
      children: [
        {
          name: 'Home',
          path: '/home',
          component: () => import('@/views/tabs/home/HomeView.vue')
        },
        {
          name: 'Order',
          path: '/order',
          component: () => import('@/views/tabs/order/OrderView.vue')
        },
        {
          name: 'Me',
          path: '/me',
          component: () => import('@/views/tabs/me/MeView.vue')
        }
      ]
    }
  ]
});

export default router;
