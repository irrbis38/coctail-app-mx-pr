import { createRouter, createWebHistory } from 'vue-router'
import { COCKTAIL_DATA } from '@/constants/cocktails'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/margarita'
    },
    {
      path: '/:code',
      name: 'Cocktail',
      component: () => import('@/pages/Cocktail/index.vue'),
      props: true,
      meta: { requiresCocktail: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresCocktail) {
    const code = to.params.code as string
    const exists = COCKTAIL_DATA.some(cocktail => cocktail.code === code)
    if (!exists) return next({ name: 'NotFound' })
  }
  next()
})

export default router
